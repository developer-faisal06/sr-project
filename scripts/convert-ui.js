// scripts/convert-ui.js
// This script converts all .jsx components under src/components/ to .tsx
// and replaces raw HTML elements with shadcn/ui components.

const fs = require('fs');
const path = require('path');

const COMPONENT_DIR = path.resolve('src/components');

// Mapping of HTML element patterns to shadcn/ui component names
const REPLACEMENTS = [
  { regex: /<button([^>]*)>/gi, replace: '<Button$1>', import: 'Button' },
  { regex: /<\/button>/gi, replace: '</Button>', import: 'Button' },
  { regex: /<input([^>]*)>/gi, replace: '<Input$1 />', import: 'Input' },
  { regex: /<textarea([^>]*)>/gi, replace: '<Textarea$1>', import: 'Textarea' },
  { regex: /<\/textarea>/gi, replace: '</Textarea>', import: 'Textarea' },
  { regex: /<select([^>]*)>/gi, replace: '<Select$1>', import: 'Select' },
  { regex: /<\/select>/gi, replace: '</Select>', import: 'Select' },
  { regex: /<dialog([^>]*)>/gi, replace: '<Dialog$1>', import: 'Dialog' },
  { regex: /<\/dialog>/gi, replace: '</Dialog>', import: 'Dialog' },
  { regex: /<table([^>]*)>/gi, replace: '<Table$1>', import: 'Table' },
  { regex: /<\/table>/gi, replace: '</Table>', import: 'Table' },
  { regex: /<tabs([^>]*)>/gi, replace: '<Tabs$1>', import: 'Tabs' },
  { regex: /<\/tabs>/gi, replace: '</Tabs>', import: 'Tabs' },
  { regex: /<dropdownmenu([^>]*)>/gi, replace: '<DropdownMenu$1>', import: 'DropdownMenu' },
  { regex: /<\/dropdownmenu>/gi, replace: '</DropdownMenu>', import: 'DropdownMenu' },
  { regex: /<popover([^>]*)>/gi, replace: '<Popover$1>', import: 'Popover' },
  { regex: /<\/popover>/gi, replace: '</Popover>', import: 'Popover' },
  { regex: /<tooltip([^>]*)>/gi, replace: '<Tooltip$1>', import: 'Tooltip' },
  { regex: /<\/tooltip>/gi, replace: '</Tooltip>', import: 'Tooltip' },
  { regex: /<switch([^>]*)>/gi, replace: '<Switch$1>', import: 'Switch' },
  { regex: /<\/switch>/gi, replace: '</Switch>', import: 'Switch' },
  { regex: /<checkbox([^>]*)>/gi, replace: '<Checkbox$1>', import: 'Checkbox' },
  { regex: /<\/checkbox>/gi, replace: '</Checkbox>', import: 'Checkbox' },
  { regex: /<radiogroup([^>]*)>/gi, replace: '<RadioGroup$1>', import: 'RadioGroup' },
  { regex: /<\/radiogroup>/gi, replace: '</RadioGroup>', import: 'RadioGroup' },
  { regex: /<slider([^>]*)>/gi, replace: '<Slider$1>', import: 'Slider' },
  { regex: /<\/slider>/gi, replace: '</Slider>', import: 'Slider' },
  { regex: /<accordion([^>]*)>/gi, replace: '<Accordion$1>', import: 'Accordion' },
  { regex: /<\/accordion>/gi, replace: '</Accordion>', import: 'Accordion' },
  { regex: /<skeleton([^>]*)>/gi, replace: '<Skeleton$1>', import: 'Skeleton' },
  { regex: /<\/skeleton>/gi, replace: '</Skeleton>', import: 'Skeleton' },
];

// Helper to get all .jsx files recursively
function getJsxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getJsxFiles(filePath));
    } else if (filePath.endsWith('.jsx')) {
      results.push(filePath);
    }
  });
  return results;
}

function convertFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const imports = new Set();
  // Apply replacements
  REPLACEMENTS.forEach(rep => {
    if (rep.regex.test(content)) {
      content = content.replace(rep.regex, rep.replace);
      imports.add(rep.import);
    }
  });
  // Update import paths to use alias @/components
  content = content.replace(/import\s+([^;]+)\s+from\s+['"](\.\/.+?)['"]/g, (match, p1, p2) => {
    const absolute = path.resolve(path.dirname(filePath), p2);
    const relativeToSrc = path.relative(path.resolve('src'), absolute);
    const aliasPath = '@/'+relativeToSrc.replace(/\\/g, '/');
    return `import ${p1} from '${aliasPath}'`;
  });
  // Update notify imports to use the new alias
  content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]\.\/\.\/lib\/notify['"]/g, (m, p) => `import {${p}} from '@/lib/notify'`);
  // Insert imports for shadcn/ui components if needed
  if (imports.size > 0) {
    const importLine = `import { ${Array.from(imports).join(', ')} } from '@/components/ui';`;
    // Add after any existing import statements
    const lines = content.split('\n');
    let insertIdx = 0;
    while (insertIdx < lines.length && lines[insertIdx].startsWith('import ')) insertIdx++;
    lines.splice(insertIdx, 0, importLine);
    content = lines.join('\n');
  }
  // Add "use client" if component imports any client‑side shadcn UI
  const clientComponents = ['Button','Dialog','DropdownMenu','Popover','Tooltip','Switch','Checkbox','RadioGroup','Slider','Accordion','Skeleton'];
  if (clientComponents.some(c => imports.has(c))) {
    if (!content.startsWith('"use client"')) {
      content = '"use client";\n' + content;
    }
  }
  // Write to .tsx file
  const newPath = filePath.replace(/\.jsx$/, '.tsx');
  fs.writeFileSync(newPath, content, 'utf8');
  // Remove the old .jsx file
  fs.unlinkSync(filePath);
  return newPath;
}

function main() {
  const files = getJsxFiles(COMPONENT_DIR);
  const converted = [];
  files.forEach(f => {
    const newFile = convertFile(f);
    converted.push(newFile);
  });
  console.log('Converted files:');
  console.log(converted.join('\n'));
}

main();
