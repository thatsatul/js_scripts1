const target1 = {
  b: 1,
  c: 2,
  deep: {
    x: 6,
    y: 7,
  }
};

const target2 = {
  b: 1,
  c: 2,
  deep: {
    x: 6,
    y: 7,
  }
};

const assignedObject = Object.assign({}, target1);
console.log('*****  Target1  *****', target1);
console.log('*****  assignedObject and assignedObject.deep.x  ******', assignedObject, assignedObject.deep.x);
// *****  Target1  ***** { b: 1, c: 2, deep: { x: 6, y: 7 } }
// *****  AssignedObject  ****** { a: 4, b: 1, deep: { x: 6, y: 7 }, c: 2 } and 6

const createdObject = Object.create(target2);
console.log('*****  Target2  *****', target2);
console.log('*****  CreatedObject  ******', createdObject, createdObject.deep.x);
// *****  Target2  ***** { b: 1, c: 2, deep: { x: 6, y: 7 } }
// *****  CreatedObject  ****** {} and 6 (target2 sits in the prototype chain of createdOject)
