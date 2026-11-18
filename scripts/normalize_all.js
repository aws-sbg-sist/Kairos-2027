const fs = require('fs');
const path = require('path');

function normalizeDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.next' && item !== '.git') {
        normalizeDir(full);
      }
    } else if (item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js') || item.endsWith('.json')) {
      let text = fs.readFileSync(full, 'utf8');
      if (text.includes('\r\n')) {
        text = text.replace(/\r\n/g, '\n');
        fs.writeFileSync(full, text, 'utf8');
      }
    }
  }
}

normalizeDir(path.join(__dirname, '..', 'src'));
normalizeDir(path.join(__dirname, '..', 'data'));
console.log('All source files converted to LF');
