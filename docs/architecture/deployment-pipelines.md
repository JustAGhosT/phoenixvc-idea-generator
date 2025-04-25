# Deployment Pipelines

## Overview

Our CI/CD pipeline architecture is designed to automate the build, test, and deployment processes for our application. We use GitHub Actions for continuous integration and Azure DevOps for deployment orchestration, ensuring consistent and reliable releases across environments.

## Pipeline Structure

Our deployment pipeline follows a multi-stage approach:

1. **Build & Test** - Compile code and run automated tests
2. **Quality Gates** - Code quality checks and security scanning
3. **Staging Deployment** - Deploy to staging environment
4. **Integration Tests** - Run integration tests against staging
5. **Production Deployment** - Deploy to production environment
6. **Post-Deployment Validation** - Verify production deployment

## GitHub Actions Workflow

### Main Workflow File

```yaml
# .github/workflows/main.yml
name: Build and Deploy

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-output
        path: .next/
        
  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-output
        path: .next/
    
    - name: Setup Azure CLI
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
    
    - name: Deploy Bicep template
      uses: azure/arm-deploy@v1
      with:
        subscriptionId: ${{ secrets.AZURE_SUBSCRIPTION }}
        resourceGroupName: ${{ secrets.AZURE_RG }}
        template: ./infra/main.bicep
        parameters: environment=staging
    
    - name: Deploy application
      run: |
        az webapp deployment source config-zip --resource-group ${{ secrets.AZURE_RG }} \
          --name ${{ secrets.WEBAPP_NAME }} --src ./build.zip
          
  integration-tests:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: staging
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run integration tests
      run: npm run test:integration
      env:
        BASE_URL: ${{ secrets.STAGING_URL }}
        
  deploy-production:
    needs: [build, integration-tests]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-output
        path: .next/
    
    - name: Setup Azure CLI
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
    
    - name: Deploy Bicep template
      uses: azure/arm-deploy@v1
      with:
        subscriptionId: ${{ secrets.AZURE_SUBSCRIPTION }}
        resourceGroupName: ${{ secrets.AZURE_RG }}
        template: ./infra/main.bicep
        parameters: environment=production
    
    - name: Deploy application
      run: |
        az webapp deployment source config-zip --resource-group ${{ secrets.AZURE_RG }} \
          --name ${{ secrets.WEBAPP_NAME }} --src ./build.zip
          
  post-deploy-validation:
    needs: deploy-production
    runs-on: ubuntu-latest
    environment: production
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Health check
      run: |
        curl -f ${{ secrets.PRODUCTION_URL }}/api/health || exit 1
```

## Environment Configuration

We maintain separate environments for development, staging, and production:

| Environment | Purpose | Access | Database |
|-------------|---------|--------|----------|
| Development | Local development | Developers | Local or dev instance |
| Staging | Pre-production testing | Team & QA | Isolated staging DB |
| Production | Live application | Public | Production DB |

### Environment Variables

Environment-specific variables are managed through GitHub Secrets and Azure Key Vault:

```yaml
# .github/workflows/set-env.yml
name: Set Environment Variables

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string

jobs:
  set-env:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    
    steps:
    - name: Get secrets from Azure Key Vault
      uses: azure/get-keyvault-secrets@v1
      with:
        keyvault: "${{ inputs.environment }}-keyvault"
        secrets: "DATABASE-URL, NEXTAUTH-SECRET, SUPABASE-URL, SUPABASE-KEY"
      id: keyvaultSecrets
      
    - name: Set environment variables
      run: |
        echo "DATABASE_URL=${{ steps.keyvaultSecrets.outputs.DATABASE-URL }}" >> $GITHUB_ENV
        echo "NEXTAUTH_SECRET=${{ steps.keyvaultSecrets.outputs.NEXTAUTH-SECRET }}" >> $GITHUB_ENV
        echo "NEXT_PUBLIC_SUPABASE_URL=${{ steps.keyvaultSecrets.outputs.SUPABASE-URL }}" >> $GITHUB_ENV
        echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=${{ steps.keyvaultSecrets.outputs.SUPABASE-KEY }}" >> $GITHUB_ENV
```

## Database Migrations

Database migrations are handled as part of the deployment process:

```yaml
# .github/workflows/db-migrate.yml
name: Database Migration

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string

jobs:
  migrate:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run Prisma migrations
      run: npx prisma migrate deploy
      env:
        DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## Rollback Strategy

In case of deployment failures, we have an automated rollback process:

```yaml
# .github/workflows/rollback.yml
name: Rollback Deployment

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to rollback'
        required: true
        default: 'staging'
        type: choice
        options:
        - staging
        - production
      version:
        description: 'Version to rollback to'
        required: true
        type: string

jobs:
  rollback:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    
    steps:
    - name: Setup Azure CLI
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
    
    - name: Rollback to previous deployment
      run: |
        az webapp deployment slot swap \
          --resource-group ${{ secrets.AZURE_RG }} \
          --name ${{ secrets.WEBAPP_NAME }} \
          --slot previous \
          --target-slot production
```

## Monitoring and Alerts

We use Azure Monitor to track deployment success and application health:

```yaml
# .github/workflows/monitoring.yml
name: Setup Monitoring

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string

jobs:
  setup-monitoring:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Azure CLI
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
    
    - name: Deploy monitoring resources
      uses: azure/arm-deploy@v1
      with:
        subscriptionId: ${{ secrets.AZURE_SUBSCRIPTION }}
        resourceGroupName: ${{ secrets.AZURE_RG }}
        template: ./infra/monitoring.bicep
        parameters: environment=${{ inputs.environment }}
        
    - name: Setup alert rules
      run: |
        az monitor alert-rule create \
          --resource-group ${{ secrets.AZURE_RG }} \
          --name "HighErrorRate" \
          --condition "count requests/failed > 5 where timeGrain = 5m" \
          --action-group ${{ secrets.ALERT_ACTION_GROUP }}
```

## Security Scanning

Security scanning is integrated into our pipeline:

```yaml
# .github/workflows/security-scan.yml
name: Security Scan

on:
  workflow_call:

jobs:
  security-scan:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Run dependency vulnerability scan
      uses: snyk/actions/node@master
      with:
        args: --severity-threshold=high
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
    
    - name: Run SAST scan
      uses: github/codeql-action/analyze@v2
      with:
        languages: javascript, typescript
```

## Performance Testing

We conduct performance testing as part of our pipeline:

```yaml
# .github/workflows/performance-test.yml
name: Performance Test

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string

jobs:
  performance-test:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup k6
      run: |
        curl -L https://github.com/loadimpact/k6/releases/download/v0.33.0/k6-v0.33.0-linux-amd64.tar.gz | tar xzf -
        sudo cp k6-v0.33.0-linux-amd64/k6 /usr/local/bin
    
    - name: Run performance tests
      run: k6 run ./performance/load-test.js
      env:
        TARGET_URL: ${{ secrets.APP_URL }}
```

## Best Practices

1. **Environment Isolation**
   - Keep development, staging, and production environments completely separate
   - Use different resource groups and service instances for each environment

2. **Secret Management**
   - Never store secrets in code or configuration files
   - Use Azure Key Vault or GitHub Secrets for sensitive information
   - Rotate secrets regularly

3. **Deployment Verification**
   - Always verify deployments with automated tests
   - Implement health checks and smoke tests
   - Monitor error rates after deployment

4. **Rollback Planning**
   - Maintain the ability to quickly roll back to previous versions
   - Test rollback procedures regularly
   - Document rollback processes for manual intervention if needed

5. **Audit Trail**
   - Maintain logs of all deployments
   - Track who deployed what and when
   - Keep deployment artifacts for troubleshooting

6. **Infrastructure as Code**
   - Manage all infrastructure through code (Bicep/ARM templates)
   - Version control infrastructure definitions
   - Test infrastructure changes in isolation

7. **Continuous Improvement**
   - Regularly review pipeline performance
   - Identify and eliminate bottlenecks
   - Automate manual steps where possible