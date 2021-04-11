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
    type: "boolean",
    default: false
  })
  .describe("indent", "Indentation width to use (in spaces)")
  .option("indent", {
    alias: "id",
    default: 2
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

  const input = yaml.safeDump(doc, { sortKeys: true, indent: argv.indent });

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
