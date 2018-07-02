# API Errors

A useful js library for generating and error list

# Usage

### JS

```js
//Import Library
var apierrors = require("apierrors");

//Generating the code
error_list = apierrors.generateCodes({
  ERR_BASIC: { msg: "Basic Error" },
  ERR_HTTP_BASIC: { msg: "Basic HTTP", http_code: 400 }
});
// => {"ERR_BASIC":{"msg":"Basic Error","code":0},"ERR_HTTP_BASIC":{"msg":"Basic HTTP","http_code":400,"code":1}}

//Convert a json file to a js file
apierrors.convertFile(
  inputFilename,
  outputFilename,
  (format = false),
  (codeCounterBase = 0)
);
```

### CLI

`node index.js -i input.json -o errors errors.js -f -c 0`

Args:

- `--input or -i` The input file, default to `errors.json`
- `--output or -o` The output file, defaults to `errors.js`
- `--format or -f` Whether or not to format the the output file, defaults to `false`
- `--counter or -c` Where to start the counter, default to `0`
