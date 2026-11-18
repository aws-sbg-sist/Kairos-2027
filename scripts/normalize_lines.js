const fs = require('fs');
const path = require('path');

function normalizeFile(filePath) {
  if (fs.existsSync(filePath)) {
    let text = fs.readFileSync(filePath, 'utf8');
    text = text.replace(/\r\n/g, '\n');
    fs.writeFileSync(filePath, text, 'utf8');
  }
}

const files = [
  'src/app/judging/page.tsx',
  'src/app/sponsors/page.tsx',
  'src/app/online-qualifier/page.tsx',
  'src/app/register/page.tsx',
  'src/lib/db.ts',
  'src/app/admin/page.tsx',
  'src/components/hero/HeroSection.tsx'
];

for (const file of files) {
  normalizeFile(path.join(__dirname, '..', file));
}
console.log('Normalized line endings to LF');
