/**
 * Script to set up ESLint rules for CSS Module imports
 * 
 * This script:
 * 1. Checks if ESLint is configured in the project
 * 2. Adds custom rules for CSS Module imports
 * 3. Optionally installs stylelint for CSS class naming conventions
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const DRY_RUN = process.argv.includes('--dry-run');
const INSTALL_STYLELINT = process.argv.includes('--stylelint');

// Logging utilities
function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m%s\x1b[0m',    // Cyan
    warning: '\x1b[33m%s\x1b[0m',  // Yellow
    error: '\x1b[31m%s\x1b[0m',    // Red
    success: '\x1b[32m%s\x1b[0m',  // Green
  };
  
  console.log(colors[type], message);
}

/**
 * Check if ESLint is configured in the project
 */
function checkESLintConfig() {
  const possibleConfigFiles = [
    '.eslintrc',
    '.eslintrc.js',
    '.eslintrc.json',
    '.eslintrc.yml',
    '.eslintrc.yaml',
  ];
  
  for (const configFile of possibleConfigFiles) {
    const configPath = path.resolve(process.cwd(), configFile);
    if (fs.existsSync(configPath)) {
      return { exists: true, path: configPath };
    }
  }
  
  return { exists: false };
}

/**
 * Update ESLint config with CSS Module import rules
 */
function updateESLintConfig(configPath) {
  let config;
  
  if (configPath.endsWith('.js')) {
    // For JS config, we need to read it as a string and modify it
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Check if the rule already exists
    if (configContent.includes('no-restricted-imports') && 
        configContent.includes('@/components/*/*.module.css')) {
      log('ESLint rule for CSS Module imports already exists', 'info');
      return false;
    }
    
    // Simple string replacement to add the rule - this is a basic approach
    const updatedContent = configContent.replace(
      /(rules\s*:\s*{)/,
      `$1
    'no-restricted-imports': [
      'error',
      {
        'patterns': [
          {
            'group': ['@/components/*/*.module.css'],
            'message': 'Use relative imports for CSS Modules'
          }
        ]
      }
    ],`
    );
    
    if (!DRY_RUN) {
      fs.writeFileSync(configPath, updatedContent, 'utf8');
    }
  } else {
    // For JSON/YAML configs, we can parse them
    try {
      if (configPath.endsWith('.json')) {
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      } else {
        // For YAML, we'd need a YAML parser
        log('YAML config files are not supported by this script', 'error');
        return false;
      }
      
      // Initialize rules object if it doesn't exist
      config.rules = config.rules || {};
      
      // Check if the rule already exists
      if (config.rules['no-restricted-imports']) {
        log('ESLint rule for CSS Module imports already exists', 'info');
        return false;
      }
      
      // Add the rule
      config.rules['no-restricted-imports'] = [
        'error',
        {
          patterns: [
            {
              group: ['@/components/*/*.module.css'],
              message: 'Use relative imports for CSS Modules'
            }
          ]
        }
      ];
      
      if (!DRY_RUN) {
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
      }
    } catch (error) {
      log(`Error updating ESLint config: ${error.message}`, 'error');
      return false;
    }
  }
  
  return true;
}

/**
 * Create a basic stylelint configuration for CSS Module naming conventions
 */
function setupStylelint() {
  const stylelintConfigPath = path.resolve(process.cwd(), '.stylelintrc.json');
  
  // Check if stylelint is already configured
  if (fs.existsSync(stylelintConfigPath)) {
    log('Stylelint is already configured', 'info');
    return false;
  }
  
  const stylelintConfig = {
    "extends": "stylelint-config-standard",
    "plugins": [
      "stylelint-selector-bem-pattern"
    ],
    "rules": {
      "selector-class-pattern": [
        // Pattern for component-prefixed camelCase class names
        "^[a-z][a-zA-Z0-9]*([A-Z][a-zA-Z0-9]*)*$",
        {
          "message": "Class names should be in camelCase and prefixed with the component name"
        }
      ],
      "plugin/selector-bem-pattern": {
        "preset": "bem",
        "componentName": "[A-Z]+",
        "componentSelectors": {
          "initial": "^\\.{componentName}(?:-[a-z]+)?$",
          "combined": "^\\.{componentName}(?:-[a-z]+)?(?:--[a-z]+)?(?:__[a-z]+)?(?:--[a-z]+)?$"
        }
      }
    }
  };
  
  if (!DRY_RUN) {
    fs.writeFileSync(stylelintConfigPath, JSON.stringify(stylelintConfig, null, 2), 'utf8');
    
    // Try to install required packages
    try {
      log('Installing stylelint packages...', 'info');
      execSync('npm install --save-dev stylelint stylelint-config-standard stylelint-selector-bem-pattern', { stdio: 'inherit' });
    } catch (error) {
      log('Failed to install stylelint packages. Please install them manually:', 'error');
      log('npm install --save-dev stylelint stylelint-config-standard stylelint-selector-bem-pattern', 'info');
    }
  }
  
  return true;
}

/**
 * Main function
 */
function main() {
  log('Setting up linting rules for CSS Modules...', 'info');
  
  if (DRY_RUN) {
    log('DRY RUN: No files will be modified', 'warning');
  }
  
  // Check for ESLint configuration
  const eslintConfig = checkESLintConfig();
  
  if (!eslintConfig.exists) {
    log('ESLint configuration not found. Please set up ESLint first.', 'error');
    return;
  }
  
  // Update ESLint config
  const updated = updateESLintConfig(eslintConfig.path);
  
  if (updated) {
    log(`Added CSS Module import rules to ${eslintConfig.path}`, 'success');
  }
  
  // Set up stylelint if requested
  if (INSTALL_STYLELINT) {
    const stylelintSetup = setupStylelint();
    
    if (stylelintSetup) {
      log('Stylelint configured for CSS class naming conventions', 'success');
    }
  } else {
    log('To set up stylelint for CSS class naming conventions, run with --stylelint', 'info');
  }
  
  log('Linting setup complete!', 'success');
}

// Run the script
main();