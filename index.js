var fs = require("fs");
var jsonfile = require("jsonfile");
const cla = require("command-line-args");

let methods = {
  convertFile: (inputName, outputName, codeCounterBase = 0) => {
    var input = jsonfile.readFileSync(inputName);

    //Setup variables
    var outputObj = {};
    var codeCounter = codeCounterBase;

    //Loop through errors and add a code to each
    for (var key in input) {
      let value = input[key];
      value.code = codeCounter;
      codeCounter += 1;
      outputObj[key] = value;
      console.log(`${key} is ${JSON.stringify(input[key])}`);
    }

    console.log(`\n${JSON.stringify(outputObj)}`);

    //Write file
    outputContent = "module.exports = " + JSON.stringify(outputObj);
    fs.writeFile(outputName, outputContent, err => {
      if (err) throw err;
      console.log("File successfully written to " + outputName);
    });
  }
};
module.exports = methods;

function FileDetails(filename) {
  exp = {};
  exp.filename = filename;
  exp.exists = fs.existsSync(filename);
  return exp;
}

const optionsDefinitions = [
  { name: "input", alias: "i", multiple: false, defaultValue: "./errors.json" },
  { name: "output", alias: "o", multiple: false, defaultValue: "./errors.js" }
];

if (require.main === module) {
  let opts = cla(optionsDefinitions);
  methods.convertFile(opts.input, opts.output);
}
