// Database module for deploying PostgreSQL
// This module creates a PostgreSQL server and database

@description('Server Name for PostgreSQL')
param serverName string

@description('Database Name for PostgreSQL')
param databaseName string

@description('Location for the database')
param location string = resourceGroup().location

@description('Administrator Login for PostgreSQL')
param administratorLogin string

@description('Administrator Login Password for PostgreSQL')
@secure()
param administratorLoginPassword string

@description('Environment name (dev, test, staging, prod)')
param environmentName string

@description('Tags to apply to resources')
param tags object

// SKU configuration based on environment
var skuName = environmentName == 'prod' ? 'GP_Gen5_2' : 'B_Gen5_1'
var skuTier = environmentName == 'prod' ? 'GeneralPurpose' : 'Basic'
var skuFamily = 'Gen5'
var skuCapacity = environmentName == 'prod' ? 2 : 1

// Storage configuration based on environment
var storageSizeGB = environmentName == 'prod' ? 100 : 20
var backupRetentionDays = environmentName == 'prod' ? 7 : 7
var geoRedundantBackup = environmentName == 'prod' ? 'Enabled' : 'Disabled'

// Create PostgreSQL Server
resource postgresServer 'Microsoft.DBforPostgreSQL/servers@2017-12-01' = {
  name: serverName
  location: location
  tags: tags
  sku: {
    name: skuName
    tier: skuTier
    family: skuFamily
    capacity: skuCapacity
  }
  properties: {
    createMode: 'Default'
    version: '11'
    administratorLogin: administratorLogin
    administratorLoginPassword: administratorLoginPassword
    sslEnforcement: 'Enabled'
    minimalTlsVersion: 'TLS1_2'
    storageProfile: {
      storageMB: storageSizeGB * 1024
      backupRetentionDays: backupRetentionDays
      geoRedundantBackup: geoRedundantBackup
    }
  }
}

// Create PostgreSQL Database
resource postgresDatabase 'Microsoft.DBforPostgreSQL/servers/databases@2017-12-01' = {
  parent: postgresServer
  name: databaseName
  properties: {
    charset: 'UTF8'
    collation: 'en_US.UTF8'
  }
}

// Allow Azure services to access PostgreSQL
resource allowAzureIPs 'Microsoft.DBforPostgreSQL/servers/firewallRules@2017-12-01' = {
  parent: postgresServer
  name: 'AllowAllAzureIPs'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

// For development environments, allow wider access
resource allowDevAccess 'Microsoft.DBforPostgreSQL/servers/firewallRules@2017-12-01' = if (environmentName == 'dev') {
  parent: postgresServer
  name: 'AllowDevAccess'
  properties: {
    startIpAddress: '0.0.0.0' // In a real scenario, limit this to specific IPs
    endIpAddress: '255.255.255.255'
  }
}

// Output the server FQDN and connection string
output serverFqdn string = postgresServer.properties.fullyQualifiedDomainName
output connectionString string = 'postgresql://${administratorLogin}@${serverName}:${administratorLoginPassword}@${postgresServer.properties.fullyQualifiedDomainName}:5432/${databaseName}'