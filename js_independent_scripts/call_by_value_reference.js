// To show premitive argument copy value and reference argument copy reference on function call

function processFunc(primitive, reference) {
  primitive += 10;
  reference.q = 3;
  console.log('***** Primitive after changed inside function *****', primitive);
  console.log('***** Reference after changed inside function *****', reference);
}

var prim = 20;
var ref = {a: 1, b: 2};
var result = processFunc(prim, ref);
console.log('***** Primitive after changed after function *****', prim);
console.log('***** Reference after changed after function *****', ref);
