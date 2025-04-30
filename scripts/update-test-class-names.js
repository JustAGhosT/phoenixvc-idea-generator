/**
 * Script to update test files to use the new component-prefixed class names
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
        from: /\.iconContainer/g,
        to: '.quoteDisplayIconContainer'
      },
      {
        from: /toHaveClass\(['"]interactive['"]\)/g,
        to: "toHaveClass('quoteDisplayInteractive')"
      },
      {
        from: /toHaveClass\(['"]variantPrimary['"]\)/g,
        to: "toHaveClass('quoteDisplayVariantPrimary')"
      },
      {
        from: /toHaveClass\(['"]variantSuccess['"]\)/g,
        to: "toHaveClass('quoteDisplayVariantSuccess')"
      },
      {
        from: /toHaveClass\(['"]sizeSM['"]\)/g,
        to: "toHaveClass('quoteDisplaySizeSM')"
      },
      {
        from: /toHaveClass\(['"]sizeLG['"]\)/g,
        to: "toHaveClass('quoteDisplaySizeLG')"
      },
      {
        from: /toHaveClass\(['"]layoutCentered['"]\)/g,
        to: "toHaveClass('quoteDisplayLayoutCentered')"
      },
      {
        from: /toHaveClass\(['"]layoutBordered['"]\)/g,
        to: "toHaveClass('quoteDisplayLayoutBordered')"
      },
      {
        from: /toHaveClass\(['"]fadeIn['"]\)/g,
        to: "toHaveClass('quoteDisplayFadeIn')"
      },
      {
        from: /toHaveClass\(['"]scaleIn['"]\)/g,
        to: "toHaveClass('quoteDisplayScaleIn')"
      }
    ]
  },
  {
    path: path.join(projectRoot, 'src/components/data-display/stat-card/__tests__/StatCard.test.tsx'),
    replacements: [
      {
        from: /\.iconContainer/g,
        to: '.statCardIconContainer'
      },
      {
        from: /toHaveClass\(['"]good['"]\)/g,
        to: "toHaveClass('statCardGood')"
      },
      {
        from: /toHaveClass\(['"]bad['"]\)/g,
        to: "toHaveClass('statCardBad')"
      }
    ]
  },
  {
    path: path.join(projectRoot, 'src/components/ui/input/__tests__/Input.test.tsx'),
    replacements: [
      {
        from: /toHaveClass\(['"]characterCount--warning['"]\)/g,
        to: "toHaveClass('inputCharacterCount--warning')"
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
  console.log('Updating test files to use component-prefixed class names...');
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