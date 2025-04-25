// Key Vault module for secrets management
// This module creates an Azure Key Vault for storing application secrets

@description('Name of the Key Vault')
param keyVaultName string

@description('Location for the Key Vault')
param location string = resourceGroup().location

@description('Environment name (dev, test, staging, prod)')
param environmentName string

@description('Tags to apply to resources')
param tags object

// Set retention days based on environment
var softDeleteRetentionInDays = environmentName == 'prod' ? 90 : 7

// Create Key Vault
resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' = {
  name: keyVaultName
  location: location
  tags: tags
  properties: {
    enabledForDeployment: true
    enabledForTemplateDeployment: true
    enabledForDiskEncryption: false
    enableRbacAuthorization: true
    tenantId: subscription().tenantId
    sku: {
      name: 'standard'
      family: 'A'
    }
    networkAcls: {
      defaultAction: 'Allow'
      bypass: 'AzureServices'
    }
    enableSoftDelete: true
    softDeleteRetentionInDays: softDeleteRetentionInDays
  }
}

// Create common secrets
resource databaseUrlSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: 'DATABASE-URL'
  properties: {
    value: 'placeholder-replace-in-pipeline' // This will be replaced in the pipeline
    contentType: 'text/plain'
  }
}

resource nextAuthSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: 'NEXTAUTH-SECRET'
  properties: {
    value: 'placeholder-replace-in-pipeline' // This will be replaced in the pipeline
    contentType: 'text/plain'
  }
}

resource supabaseUrlSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: 'SUPABASE-URL'
  properties: {
    value: 'placeholder-replace-in-pipeline' // This will be replaced in the pipeline
    contentType: 'text/plain'
  }
}

resource supabaseKeySecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: 'SUPABASE-KEY'
  properties: {
    value: 'placeholder-replace-in-pipeline' // This will be replaced in the pipeline
    contentType: 'text/plain'
  }
}

// Output the Key Vault URI
output keyVaultUri string = keyVault.properties.vaultUri
output keyVaultName string = keyVault.name