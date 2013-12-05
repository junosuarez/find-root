var path = require('path')
var fs = require('fs')

function findRoot(start) {
  start = start || module.parent.filename
  if (typeof start === 'string') {
    start = start.split(path.sep)
  }
  if(!start.length) {
    throw new Error('package.json not found in path')
  }
  start.pop()
  var dir = start.join(path.sep)
  if (fs.existsSync(path.join(dir, 'package.json'))) {
    return dir
  }
  return findRoot(start)
}

module.exports = findRoot