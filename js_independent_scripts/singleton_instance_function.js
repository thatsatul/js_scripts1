// Singleton instance

function User() {
	// do we have an existing instance?
	if (typeof User.instance === 'object') {
    console.log('**** User instance found *****');
		return User.instance;
  }
  else {
    console.log('**** Creating new user instance *****');
    // cache
	  User.instance = this;
  }
	
	// proceed as normal
	this.firstName = 'John';
	this.lastName = 'Doe';
}

var x1 = new User();
console.log(x1.firstName, x1.lastName);
x1.firstName = 'Ram';
var x2 = new User();
console.log(x2.firstName, x2.lastName);
