const path = require('path');

module.exports = {
  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/__stories__/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/__tests__/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    // Add TypeScript support
    config.resolve.extensions.push('.ts', '.tsx');
    
    // Let webpack.config.js handle the path aliases
    // to avoid conflicts between the two files
    
    return config;
  }
};