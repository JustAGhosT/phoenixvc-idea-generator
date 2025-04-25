// Web App module for deploying the Next.js application
// This module creates an App Service Plan and Web App

@description('Name of the web app')
param appName string

@description('Location for the web app')
param location string = resourceGroup().location

@description('App Service Plan name')
param appServicePlanName string

@description('Application Insights resource name')
param appInsightsName string

@description('Environment name (dev, test, staging, prod)')
param environmentName string

@description('Tags to apply to resources')
param tags object

// SKU for the App Service Plan based on environment
var skuName = environmentName == 'prod' ? 'P1v2' : 'B1'
var skuTier = environmentName == 'prod' ? 'PremiumV2' : 'Basic'

// Create App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: appServicePlanName
  location: location
  tags: tags
  sku: {
    name: skuName
    tier: skuTier
  }
  properties: {
    reserved: true // Required for Linux
  }
}

// Create Application Insights
resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Request_Source: 'rest'
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

// Create Web App
resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: appName
  location: location
  tags: tags
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
      alwaysOn: environmentName == 'prod' ? true : false
      minTlsVersion: '1.2'
      http20Enabled: true
      nodeVersion: '~18'
      appSettings: [
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsights.properties.InstrumentationKey
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
        {
          name: 'NODE_ENV'
          value: environmentName == 'prod' ? 'production' : 'development'
        }
        {
          name: 'WEBSITE_NODE_DEFAULT_VERSION'
          value: '~18'
        }
        {
          name: 'NEXT_PUBLIC_ENVIRONMENT'
          value: environmentName
        }
      ]
    }
    httpsOnly: true
  }
}

// Create deployment slot for staging environment
resource stagingSlot 'Microsoft.Web/sites/slots@2022-03-01' = if (environmentName == 'prod') {
  parent: webApp
  name: 'staging'
  location: location
  tags: tags
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
      alwaysOn: true
      minTlsVersion: '1.2'
      http20Enabled: true
      nodeVersion: '~18'
      appSettings: [
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsights.properties.InstrumentationKey
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
        {
          name: 'NODE_ENV'
          value: 'production'
        }
        {
          name: 'WEBSITE_NODE_DEFAULT_VERSION'
          value: '~18'
        }
        {
          name: 'NEXT_PUBLIC_ENVIRONMENT'
          value: 'staging'
        }
      ]
    }
    httpsOnly: true
  }
}

// Output the web app URL and hostname
output webAppUrl string = 'https://${webApp.properties.defaultHostName}'
output webAppHostName string = webApp.properties.defaultHostName