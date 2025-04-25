// CDN module for content delivery
// This module creates an Azure CDN profile and endpoint for content delivery

@description('Name of the CDN Profile')
param cdnProfileName string

@description('Name of the CDN Endpoint')
param cdnEndpointName string

@description('Location for the CDN')
param location string = resourceGroup().location

@description('Origin URL for the CDN endpoint')
param originUrl string

@description('Tags to apply to resources')
param tags object

// Create CDN Profile
resource cdnProfile 'Microsoft.Cdn/profiles@2022-05-01-preview' = {
  name: cdnProfileName
  location: location
  tags: tags
  sku: {
    name: 'Standard_Microsoft'
  }
}

// Create CDN Endpoint
resource cdnEndpoint 'Microsoft.Cdn/profiles/endpoints@2022-05-01-preview' = {
  parent: cdnProfile
  name: cdnEndpointName
  location: location
  tags: tags
  properties: {
    originHostHeader: originUrl
    isHttpAllowed: false
    isHttpsAllowed: true
    queryStringCachingBehavior: 'IgnoreQueryString'
    contentTypesToCompress: [
      'application/javascript'
      'application/json'
      'application/xml'
      'text/css'
      'text/html'
      'text/javascript'
      'text/plain'
      'text/xml'
      'image/svg+xml'
    ]
    isCompressionEnabled: true
    origins: [
      {
        name: 'webapp-origin'
        properties: {
          hostName: originUrl
          httpPort: 80
          httpsPort: 443
          originHostHeader: originUrl
          priority: 1
          weight: 1000
          enabled: true
        }
      }
    ]
    deliveryPolicy: {
      rules: [
        {
          name: 'EnforceHTTPS'
          order: 1
          conditions: [
            {
              name: 'RequestScheme'
              parameters: {
                matchValues: [
                  'HTTP'
                ]
                operator: 'Equal'
                negateCondition: false
                typeName: 'DeliveryRuleRequestSchemeConditionParameters'
              }
            }
          ]
          actions: [
            {
              name: 'UrlRedirect'
              parameters: {
                redirectType: 'Found'
                destinationProtocol: 'Https'
                typeName: 'DeliveryRuleUrlRedirectActionParameters'
              }
            }
          ]
        }
        {
          name: 'CacheStaticFiles'
          order: 2
          conditions: [
            {
              name: 'UrlFileExtension'
              parameters: {
                operator: 'Any'
                negateCondition: false
                matchValues: [
                  'css'
                  'js'
                  'png'
                  'jpg'
                  'jpeg'
                  'gif'
                  'svg'
                  'ico'
                  'woff'
                  'woff2'
                  'ttf'
                  'eot'
                ]
                typeName: 'DeliveryRuleUrlFileExtensionMatchConditionParameters'
              }
            }
          ]
          actions: [
            {
              name: 'CacheExpiration'
              parameters: {
                cacheBehavior: 'Override'
                cacheType: 'All'
                cacheDuration: '7.00:00:00'
                typeName: 'DeliveryRuleCacheExpirationActionParameters'
              }
            }
          ]
        }
        {
          name: 'OptimizeNextJsFiles'
          order: 3
          conditions: [
            {
              name: 'UrlPath'
              parameters: {
                operator: 'BeginsWith'
                negateCondition: false
                matchValues: [
                  '/_next/'
                ]
                typeName: 'DeliveryRuleUrlPathMatchConditionParameters'
              }
            }
          ]
          actions: [
            {
              name: 'CacheExpiration'
              parameters: {
                cacheBehavior: 'Override'
                cacheType: 'All'
                cacheDuration: '30.00:00:00'
                typeName: 'DeliveryRuleCacheExpirationActionParameters'
              }
            }
          ]
        }
      ]
    }
  }
}

// Output the CDN endpoint URL
output cdnEndpointUrl string = 'https://${cdnEndpoint.properties.hostName}'
output cdnEndpointHostName string = cdnEndpoint.properties.hostName
