// https://github.com/assaf/node-passbook/blob/master/README.md

var createTemplate = require("passbook");
var fs  = require('fs');

var template = createTemplate("coupon", {
  passTypeIdentifier: "pass.com.test.spicejet",
  teamIdentifier:     "46R6PQ6RKJ",
  backgroundColor:   "rgb(255,255,255)",
  organizationName : "Spicejet",
});

/*
template.fields.passTypeIdentifier = "pass.com.test.spicejet";

console.log(template.passTypeIdentifier());

template.teamIdentifier("MXL").
  passTypeIdentifier("pass.com.example.passbook")

*/

template.keys("/etc/passbook/keys", "secret");
template.loadImagesFrom("/etc/passbook/images");

var pass = template.createPass({
  serialNumber:  "123456",
  description:   "20% off"
});

/*
pass.fields.serialNumber = "12345";
console.log(pass.serialNumber());
pass.serialNumber("12345").
  description("20% off");
*/


pass.primaryFields.add("date", "Date", "Nov 1");
pass.primaryFields.add({ key: "time", label: "Time", value: "10:00AM"});

/*
var dateField = pass.primaryFields.get("date");
var allFields = pass.primaryFields.all();
pass.primaryFields.remove("date");
pass.primaryFields.clear();
*/

pass.images.icon = "/etc/passbook/images/sample.jpeg";
// pass.icon(iconFilename);
// pass.loadImagesFrom("images");

var file = fs.createWriteStream("sample.pkpass");
pass.on("error", function(error) {
  console.error(error);
  process.exit(1);
})
pass.pipe(file);
