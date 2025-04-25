// Main Bicep template for deploying the complete application infrastructure
// This template orchestrates the deployment of all resources needed for the application

@description('The environment name (dev, test, staging, prod)')
param environmentName string = 'dev'

@description('The Azure region for all resources')
param location string = resourceGroup().location

@description('Tags to apply to all resources')
param tags object = {
  Environment: environmentName
  Application: 'PhoenixVC Idea Generator'
  ManagedBy: 'Bicep'
}

// Variables for resource naming
var prefix = 'phoenixvc'
var appName = '${prefix}-${environmentName}'

// Define allowed environment names
@allowed([
  'dev'
  'test'
  'staging'
  'prod'
])
param environment string

// Resource naming function
func resourceName(resourceType string) string => '${appName}-${resourceType}'

// Deploy the web app resources
module webAppModule 'modules/webapp.bicep' = {
  name: 'webAppDeployment'
  params: {
    appName: resourceName('app')
    location: location
    tags: tags
    environmentName: environmentName
    appServicePlanName: resourceName('plan')
    appInsightsName: resourceName('insights')
  }
}

// Deploy the database resources
module databaseModule 'modules/database.bicep' = {
  name: 'databaseDeployment'
  params: {
    serverName: resourceName('db')
    databaseName: resourceName('postgres')
    location: location
    tags: tags
    environmentName: environmentName
    administratorLogin: 'dbadmin'
    // In production, use Key Vault to retrieve this
    administratorLoginPassword: 'P@ssw0rd123!'
  }
}

// Deploy Key Vault for secrets management
module keyVaultModule 'modules/keyvault.bicep' = {
  name: 'keyVaultDeployment'
  params: {
    keyVaultName: resourceName('kv')
    location: location
    tags: tags
    environmentName: environmentName
  }
}

// Deploy storage account for file storage
module storageModule 'modules/storage.bicep' = {
  name: 'storageDeployment'
  params: {
    storageAccountName: replace(resourceName('st'), '-', '')  // Storage accounts don't allow hyphens
    location: location
    tags: tags
    environmentName: environmentName
  }
}

// Deploy CDN for content delivery
module cdnModule 'modules/cdn.bicep' = if (environment == 'staging' || environment == 'prod') {
  name: 'cdnDeployment'
  params: {
    cdnProfileName: resourceName('cdn')
    cdnEndpointName: resourceName('endpoint')
    location: location
    tags: tags
    originUrl: webAppModule.outputs.webAppHostName
  }
}

// Deploy monitoring resources
module monitoringModule 'modules/monitoring.bicep' = {
  name: 'monitoringDeployment'
  params: {
    logAnalyticsName: resourceName('logs')
    location: location
    tags: tags
    environmentName: environmentName
    appInsightsName: resourceName('insights')
  }
}

// Output important information
output webAppUrl string = webAppModule.outputs.webAppUrl
output databaseServer string = databaseModule.outputs.serverFqdn
output keyVaultUri string = keyVaultModule.outputs.keyVaultUri