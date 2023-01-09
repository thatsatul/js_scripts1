// Timer animation for showing counter from 0 to finalVal in 2s
// https://jsfiddle.net/atul1anand/xco3uL4p/15/

let initialVal = 0;
const finalVal = 1212312432;
const animationTimes = 22;
const timeInterval = 2000 / animationTimes;
let numInterval = Math.ceil(parseInt((finalVal - initialVal) / animationTimes));
console.log('****** Timeinterval, NumberInterval *******', timeInterval, numInterval);


// setInterval will run 11 times starting from 0s
var tmInterval = setInterval(() => {
    if(initialVal >= finalVal) {
      clearInterval(tmInterval);
      return;
    }
    
    initialVal = (initialVal + numInterval) > finalVal ? finalVal : initialVal + numInterval;
    console.log(initialVal);
}, timeInterval);
