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
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    // Add TypeScript support
    config.resolve.extensions.push('.ts', '.tsx');
    
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/hooks': path.resolve(__dirname, '../src/hooks'),
      '@/utils': path.resolve(__dirname, '../src/utils'),
      '@': path.resolve(__dirname, '../src'),
    };
    
    return config;
  }
};