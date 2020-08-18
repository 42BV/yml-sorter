#! /usr/bin/env node

const argv = require("yargs")
  .usage("Usage: yml-sorter [options]")
  .example(
    "yml-sorter --input application-yml",
    "Sorts the file application.yml alphabetically."
  )
  .example(
    "yml-sorter --input application-yml --output dragons.yml",
    "Sorts and writes the output to dragons.yml"
  )
  .example(
    "yml-sorter --input application-yml --dry-run",
    "Writes the output to the terminal"
  )
  .example(
    "yml-sorter --input application-yml --indent 4",
    "Indent with 4 spaces"
  )
  .example(
    "yml-sorter --ignoreKeys abc def",
    "Excludes from sorting keys with given prefix"
  )
  .describe("input", "The yml file which needs to be sorted")
  .option("input", {
    alias: "i",
  })
  .describe("output", "The file to wich to write the output")
  .option("output", {
    alias: "o",
  })
  .describe("dry-run", "Only outputs the proposed sort to the terminal")
  .option("dry-run", {
    alias: "d",
    default: false
  })
  .describe("indent", "Indentation width to use (in spaces)")
  .option("indent", {
    alias: "id",
    default: 2
  })
  .describe("ignoreKeys", "Prefix for keys that will be ignored")
  .option("ignoreKeys", {
    alias: "ik",
    type: 'array',
    default: null
  })
  .demandOption(["input"])
  .help("h")
  .alias("h", "help")
  .epilog("With love from 42.nl")
  .wrap(null).argv;

yaml = require("js-yaml");
fs = require("fs");




// Get document, or throw exception on error
try {
  const doc = yaml.safeLoad(fs.readFileSync(argv.input, "utf8"));

  const ignoreKeys = argv.ignoreKeys;
  const input = yaml.safeDump(doc, { 
	  sortKeys: ignoreKeys != null 
	  	? customComparator(ignoreKeys) 
	  	: true, indent: argv.indent });

  if (argv["dry-run"]) {
    console.log(input);
  } else {
    const output = argv.output ? argv.output : argv.input;

    fs.writeFile(output, input, error => {
      if (error) {
        return console.error(error);
      }
    });
  }
} catch (error) {
  console.error(error);
}


function customComparator(ignoreKeys) {
    return function customSort(a, b) {
	  //allow ignored keys
	  if(ignoreKeys != null) {
		  for(ignoredKey of ignoreKeys) {
			  if(a.startsWith(ignoredKey)) {
				  return 0
			  }
		  }
	  }
	  if (a < b) {
	    return -1;
	  }
	  if (a > b) {
	    return 1;
	  }
	  return 0;
    }
}




