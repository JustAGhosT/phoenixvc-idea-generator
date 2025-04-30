/**
 * Script to revert test files to use the current class names
 */

const fs = require('fs');
const path = require('path');

// Get the project root directory
const projectRoot = path.resolve(__dirname, '..');

// Test files to update with absolute paths
const testFiles = [
  {
    path: path.join(projectRoot, 'src/components/data-display/quote-display/__tests__/QuoteDisplay.test.tsx'),
    replacements: [
      {
        from: /toHaveClass\(['"]quoteDisplayIconContainer['"]\)/g,
        to: "toHaveClass('iconContainer')"
      },
      {
        from: /toHaveClass\(['"]quoteDisplayInteractive['"]\)/g,
        to: "toHaveClass('interactive')"
      },
      {
        from: /toHaveClass\(['"]quoteDisplayVariantPrimary['"]\)/g,
        to: "toHaveClass('variantPrimary')"
      },
      {
        from: /toHaveClass\(['"]quoteDisplayVariantSuccess['"]\)/g,
        to: "toHaveClass('variantSuccess')"
      },
      {
        from: /toHaveClass\(['"]quoteDisplaySizeSM['"]\)/g,
        to: "toHaveClass('sizeSM')"
      },
      {
        from: /toHaveClass\(['"]quoteDisplaySizeLG['"]\)/g,
        to: "toHaveClass('sizeLG')"
      },
      {
        from: /toHaveClass\(['"]quoteDisplayLayoutCentered['"]\)/g,
        to: "toHaveClass('layoutCentered')"
      },
      {
        from: /toHaveClass\(['"]quoteDisplayLayoutBordered['"]\)/g,
        to: "toHaveClass('layoutBordered')"
      },
      {
        from: /toHaveClass\(['"]quoteDisplayFadeIn['"]\)/g,
        to: "toHaveClass('fadeIn')"
      },
      {
        from: /toHaveClass\(['"]quoteDisplayScaleIn['"]\)/g,
        to: "toHaveClass('scaleIn')"
      }
    ]
  },
  {
    path: path.join(projectRoot, 'src/components/data-display/stat-card/__tests__/StatCard.test.tsx'),
    replacements: [
      {
        from: /\.statCardIconContainer/g,
        to: '.iconContainer'
      },
      {
        from: /toHaveClass\(['"]statCardGood['"]\)/g,
        to: "toHaveClass('good')"
      },
      {
        from: /toHaveClass\(['"]statCardBad['"]\)/g,
        to: "toHaveClass('bad')"
      }
    ]
  },
  {
    path: path.join(projectRoot, 'src/components/ui/input/__tests__/Input.test.tsx'),
    replacements: [
      {
        from: /toHaveClass\(['"]inputCharacterCount--warning['"]\)/g,
        to: "toHaveClass('characterCount--warning')"
      }
    ]
  }
];

// Function to update a file with replacements
function updateFile(filePath, replacements) {
  try {
    console.log(`Checking file: ${filePath}`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File does not exist: ${filePath}`);
      return false;
    }
    
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content;
    
    // Apply all replacements
    replacements.forEach(({ from, to }) => {
      updatedContent = updatedContent.replace(from, to);
    });
    
    // Write the updated content back to the file
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      return true;
    } else {
      console.log(`⚠️ No changes made to: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('Reverting test files to use current class names...');
  console.log(`Project root: ${projectRoot}`);
  
  let updatedCount = 0;
  
  testFiles.forEach(file => {
    if (fs.existsSync(file.path)) {
      const updated = updateFile(file.path, file.replacements);
      if (updated) updatedCount++;
    } else {
      console.error(`❌ File not found: ${file.path}`);
    }
  });
  
  console.log(`\nUpdate complete! ${updatedCount}/${testFiles.length} files updated.`);
}

// Run the script
main();