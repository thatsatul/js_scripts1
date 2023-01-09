var uri = "http://www.wrox.com/illegal value.htm#start";
//”http://www.wrox.com/illegal%20value.htm#start”
var encUri = encodeURI(uri);
console.log('********* encodeURI(uri) ********', uri, encUri);
//”http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start”
var encUriComp = encodeURIComponent(uri);
console.log('********* encodeURIComponent(uri) ********', uri, encUriComp);

//http%3A%2F%2Fwww.wrox.com%2Fillegal value.htm%23start
console.log('********* decodeURI(encUri) **********', encUri, decodeURI(encUri));
//http://www.wrox.com/illegal value.htm#start
console.log('********* decodeURIComponent(encodeURIComponent) **********', encUriComp, decodeURIComponent(encUriComp));
