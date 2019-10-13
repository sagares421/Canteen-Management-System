const fs = require('fs');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = JSON.parse(fs.readFileSync(path.resolve(__dirname, NODE_ENV+'.json'), 'utf-8'));