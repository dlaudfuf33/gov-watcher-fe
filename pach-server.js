// pach-server.js
const { readFileSync, writeFileSync } = require("fs");

const path = "./.next/standalone/server.js";
let content = readFileSync(path, "utf8");

content = content.replace(/process.env.HOSTNAME/, `process.env.HOST`);

writeFileSync(path, content);

console.log("✅ server.js patched: HOSTNAME -> HOST");
