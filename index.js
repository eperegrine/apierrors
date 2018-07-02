#!/usr/bin/env node

var fs_path = require("fs-path");
var prettier = require("prettier");
var jsonfile = require("jsonfile");
const cla = require("command-line-args");

let methods = {
  generateCodes: (errorJSON, codeCounterBase = 0) => {
    var outputObj = {};
    var codeCounter = codeCounterBase;
    //Loop through errors and add a code to each
    for (var key in errorJSON) {
      let value = errorJSON[key];
      value.code = codeCounter;
      codeCounter += 1;
      outputObj[key] = value;
    }
    return outputObj;
  },
  convertFile: (inputName, outputName, format = false, codeCounterBase = 0) => {
    var errorJSON = jsonfile.readFileSync(inputName);
    outputObj = methods.generateCodes(errorJSON, codeCounterBase);
    //Write file
    outputContent = "module.exports=" + JSON.stringify(outputObj);
    if (format)
      outputContent = prettier.format(outputContent, { parser: "babylon" });
    fs_path.writeFile(outputName, outputContent, err => {
      if (err) throw err;
      console.log("File successfully written to " + outputName);
    });
  }
};
module.exports = methods;

const optionsDefinitions = [
  { name: "input", alias: "i", multiple: false, defaultValue: "./errors.json" },
  { name: "output", alias: "o", multiple: false, defaultValue: "./errors.js" },
  {
    name: "counter",
    alias: "c",
    multiple: false,
    defaultValue: 0,
    type: Number
  },
  {
    name: "format",
    alias: "f",
    type: Boolean,
    defaultValue: false,
    multiple: false
  }
];

if (require.main === module) {
  let opts = cla(optionsDefinitions);
  methods.convertFile(opts.input, opts.output, opts.format, opts.counter);
}
