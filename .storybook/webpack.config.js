const path = require('path');

module.exports = ({ config }) => {
  // Add TypeScript support with babel-loader for JSX
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          configFile: path.resolve(__dirname, 'babel.config.js'),
          presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-typescript',
            ['@babel/preset-react', { runtime: 'automatic' }]
          ],
        },
      },
    ],
  });
  
  // Fix path aliases to point to src directory
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, '../src'),  // Fixed: point to src directory
    'react': path.resolve(__dirname, '../node_modules/react'),
    'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
  };
  
  config.resolve.extensions.push('.ts', '.tsx');
  
  return config;
};