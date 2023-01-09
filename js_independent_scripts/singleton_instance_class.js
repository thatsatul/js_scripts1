// Singleton instance

class Singleton {
	constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    } else {
      return Singleton.instance;
    }
  }

  testSingletonFunction() {
    console.log('Name is: ' + this.name);
  }
}

var s1 = new Singleton();
s1.testSingletonFunction();
var s2 = new Singleton();
s2.name = 'Mukul';
s1.testSingletonFunction();
