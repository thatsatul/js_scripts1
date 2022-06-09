// Run below command to convert class to function
// babel --plugins @babel/plugin-transform-classes class_to_function.js --watch --out-file script-compiled.js --source-maps

class Test {
  constructor(name) {
    this.name = name;
    this.gender = 'M'
  }

  logger() {
    console.log("Hello", this.name);
  }
}
