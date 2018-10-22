# About

This is a tool which allows you to sort yml files via a CLI.

The tool is basically a tiny wrapper around the great [js-yaml](https://github.com/nodeca/js-yaml).

# Installation

`npm install -g yml-sorter`

# Usage

```
Usage: yml-sorter [options]

Options:
  --input, -i     The yml file which needs to be sorted  [required]
  --output, -o    The file to wich to write the output
  --dry-run, -d   Only outputs the proposed sort to the terminal  [default: false]
  --indent, --id  Indentation width to use (in spaces)  [default: 2]
  -h, --help      Show help  [boolean]

Examples:
  yml-sorter --input application-yml                       Sorts the file application.yml alphabetically.
  yml-sorter --input application-yml --output dragons.yml  Sorts and writes the output to dragons.yml
  yml-sorter --input application-yml --dry-run             Writes the output to the terminal
  yml-sorter --input application-yml --indent 4            Indent with 4 spaces

With love from 42.nl
```
