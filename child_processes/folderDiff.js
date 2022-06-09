const fs = require('fs');

const path1 = '/Users/atulanand/projects/ixiair2';
const path2 = '/Users/atulanand/projects/spicejet-new-website';
const files1 = {};
const files2 = {};

const skipDir = ['node_modules', '.git', 'android', 'ios', 'logs', 'public', 'static', 'src'];

let maxCount = null;
let count = 0;

const readDirForPath = (path, obj) => {
  if(maxCount && count > maxCount)
    return;
  const files = fs.readdirSync(path);
  files.forEach(file => {
    if(skipDir.indexOf(file) > -1) {
      return;
    }
    const allPath = path + '/' + file;
    // console.log(allPath);
    if(fs.lstatSync(allPath).isDirectory()) {
      obj[file] = {
        name: allPath,
        type: 'D'
      };
      count++;
      readDirForPath(allPath, obj);
    }
    else {
      obj[file] = {
        name: allPath,
        type: 'F'
      };
      count++;
    }
  });
}

readDirForPath(path1, files1);
console.log('  Total files + Directories found in ', path1, count);

count = 0;
readDirForPath(path2, files2);
console.log('  Total files + Directories found in ', path2, count);

if(maxCount) {
  Object.keys(files1).forEach(p => {
    console.log(p);
  });
  process.exit(1);
}

let diffCount = 0;
let diffMaxCount = null;
const diffFiles = [];

Object.keys(files1).forEach(f1 => {
  if(diffMaxCount && diffCount > diffMaxCount)
    return;
  if(Object.keys(files2).indexOf(f1) > -1) {
    if(files1[f1].type === 'F') {
      const data1 = fs.readFileSync(files1[f1].name, {encoding:'utf8', flag:'r'});
      const data2 = fs.readFileSync(files2[f1].name, {encoding:'utf8', flag:'r'});
      // console.log(data1);
      if(data1 !== data2) {
        diffFiles.push(f1);
        diffCount++;
        console.log('*** Content not matching ****', files1[f1].name);
      }
    }
  } else {
    if(files1[f1].type === 'F') {
      diffFiles.push(f1);
      diffCount++;
      console.log('*** File not present ****', files1[f1].name);
    }
  }
});
