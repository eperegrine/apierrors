var fs = require("fs");

let methods = {
  convertFile: (inputName, outputName, codeCounterBase = 0) => {
    var input = require(inputName);
    var outputObj = {};
    var codeCounter = codeCounterBase;
    for (var key in input) {
      let value = input[key];
      value.code = codeCounter;
      codeCounter += 1;
      outputObj[key] = value;
      console.log(`${key} is ${JSON.stringify(input[key])}`);
    }
    console.log(`\n${JSON.stringify(outputObj)}`);
    outputContent = "module.exports = " + JSON.stringify(outputObj);
    fs.writeFile(outputName, outputContent, err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("success!");
    });
  }
};
module.exports = methods;

if (require.main === module) {
  methods.convertFile("./error_files/errors_1.json", "./output/errors_1.js");
}
