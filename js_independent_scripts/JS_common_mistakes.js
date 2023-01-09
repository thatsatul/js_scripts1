/*
// https://www.toptal.com/javascript/10-most-common-javascript-mistakes

1. Error while handling this.
2. Attaching events and forgetting to unattach it on unmounting.
3. Similar case with setTimeout and setInterval
5. Not using event delegation wherever possible
6. Not handling null / undefined properly
7. Memory leaks
8. Confusion about == and ===
9. confusion with global and local scope
10. Not using strict mode leads to unforeseen errors

*/


// If you run the below code and monitor memory usage, you’ll find that you’ve got a massive memory leak, leaking a full megabyte per second! And even a manual GC doesn’t help. So it looks like we are leaking longStr every time replaceThing is called. 
var theThing = null;
var replaceThing = function () {
  var priorThing = theThing;  // hold on to the prior thing
  var unused = function () {
    // 'unused' is the only place where 'priorThing' is referenced,
    // but 'unused' never gets invoked
    if (priorThing) {
      console.log("hi");
    }
  };
  theThing = {
    longStr: new Array(1000000).join('*'),  // create a 1MB object
    someMethod: function () {
      console.log(someMessage);
    }
  };
};
setInterval(replaceThing, 1000);    // invoke `replaceThing' once every second