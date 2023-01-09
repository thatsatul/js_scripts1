hoisted(); // This wont give any error
notHoisted(); // This will give referenceerror

function hoisted() {
  console.log('This will get hoisted');
}

const notHoisted = function() {
  console.log('This will not get hoisted');
}

notHoisted(); // This will work properly
