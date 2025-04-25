const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Components to find imports for
const componentsToFind = [
  'sidebar',
  'BarChart',
  'QuoteDisplay',
  'StatCard',
  // Add other components as needed
];

// Find all TypeScript and TSX files
const files = glob.sync('**/*.{ts,tsx}', {
  ignore: ['node_modules/**', 'scripts/**', '.next/**']
});

// Process each file
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  componentsToFind.forEach(component => {
    // Look for import statements
    const importRegex = new RegExp(`import.*${component}.*from ['"](.*)['"]`, 'g');
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      console.log(`${file}: Found import for ${component} from ${match[1]}`);
    }
    
    // Look for usage of the component
    const usageRegex = new RegExp(`<${component}[\\s/>]`, 'g');
    let usageMatch;
    
    while ((usageMatch = usageRegex.exec(content)) !== null) {
      console.log(`${file}: Found usage of ${component}`);
    }
  });
});