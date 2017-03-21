var path = require('path');
var fs = require('fs');

function findRoot(start, packageName) {
  start = start || module.parent.filename;
  if (typeof start === 'string') {
    if (start[start.length-1] !== path.sep) {
      start+=path.sep;
    }
    start = start.split(path.sep);
  }
  if(!start.length) {
    throw new Error('package.json not found in path');
  }
  start.pop();
  var dir = start.join(path.sep);
  try {
    fs.statSync(path.join(dir, 'package.json'));
    if(packageName){
      var packageJSON = fs.readFileSync( path.join(dir, 'package.json') );
      packageJSON = JSON.parse( packageJSON );
      if(packageJSON.name === packageName){
        return dir;
      }
    }else{
      return dir;
    }
  } catch (e) {}
  return findRoot(start);
}

module.exports = findRoot;
