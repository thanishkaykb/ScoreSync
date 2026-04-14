const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        filelist = walkSync(path.join(dir, file), filelist);
      }
    }
    else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const frontendDir = 'c:\\Users\\TEJESHWAR\\Downloads\\Cred-Fi-main\\Cred-Fi-main\\frontend';
const files = walkSync(frontendDir, []);
let count = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/\bSHM\b/g, 'ETH')
    .replace(/Shardeum Mezame/g, 'Sepolia Testnet')
    .replace(/Shardeum/gi, 'Sepolia')
    .replace(/8119/g, '11155111');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    count++;
  }
});
console.log(`Updated ${count} files.`);
