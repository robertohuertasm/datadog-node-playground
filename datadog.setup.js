const fs = require('fs');
const path = require('path');

const pkg = require('./package.json');
const start = pkg.scripts.start;

let commitSha = process.argv[2];

if (commitSha) {
  pkg.scripts.start = `DD_TAGS="git.commit.sha:${commitSha},git.repository_url:github.com/robertohuertasm/datadog-node-playground" ${start}`
} else {
  pkg.scripts.start = `DD_TAGS="git.repository_url:github.com/robertohuertasm/datadog-node-playground" ${start}`
}

const filePath = path.join(__dirname, './package.json');
fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2));
console.log(`Modified package.json`);
