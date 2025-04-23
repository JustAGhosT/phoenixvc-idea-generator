const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

// Get React version
const reactVersion = packageJson.dependencies.react;
console.log(`Checking dependencies for compatibility with React ${reactVersion}...`);

// Get all dependencies
const allDependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies
};

// Check each dependency for React peer dependency
const results = [];

Object.entries(allDependencies).forEach(([name, version]) => {
  // Skip checking React itself
  if (name === 'react' || name === 'react-dom') return;
  
  try {
    // Try to get the package.json of the dependency
    const depPackageJson = execSync(`npm view ${name} peerDependencies --json`, { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    });
    
    if (depPackageJson) {
      const peerDeps = JSON.parse(depPackageJson);
      
      if (peerDeps && peerDeps.react) {
        results.push({
          name,
          version,
          reactPeerDep: peerDeps.react,
          compatible: peerDeps.react.includes('19') || peerDeps.react.includes('*')
        });
      }
    }
  } catch (error) {
    // Some packages might not have peer dependencies
  }
});

// Print results
console.log('\nDependencies with React peer requirements:');
results.forEach(dep => {
  console.log(`${dep.name}@${dep.version} - Requires React: ${dep.reactPeerDep} - ${dep.compatible ? '✅ Compatible' : '❌ Potentially incompatible'}`);
});

const incompatibleCount = results.filter(dep => !dep.compatible).length;
console.log(`\nFound ${incompatibleCount} potentially incompatible dependencies.`);

if (incompatibleCount > 0) {
  console.log('\nConsider checking these packages for React 19 compatibility or downgrading React version.');
}