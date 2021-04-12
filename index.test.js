const execSync = require("child_process").execSync;
const fs = require("fs");

const tmpDir = "./tmp";

beforeEach(() => prepareTmpDirectory());

describe("input flag", () => {
  test("that --input flag works", () => {
    const result = inputCheck("--input");
    expect(result).toMatchInlineSnapshot(`
      "a:
        b: World
        z: Hello
      b:
        a: 3
        v: 2
        z: 1
      c:
        a: Foo
        c: Baz
        d: Bar
      "
    `);
  });

  test("that -i flag works", () => {
    const result = inputCheck("-i");
    expect(result).toMatchInlineSnapshot(`
      "a:
        b: World
        z: Hello
      b:
        a: 3
        v: 2
        z: 1
      c:
        a: Foo
        c: Baz
        d: Bar
      "
    `);
  });

  function inputCheck(flag) {
    execSync(`node index.js ${flag} ${tmpDir}/simple.yml`);

    // It should have overwritten the file and not create a new one
    const files = fs.readdirSync(tmpDir);
    expect(files.length).toBe(1);
    expect(files).toEqual(["simple.yml"]);

    return fs.readFileSync(`${tmpDir}/simple.yml`, "utf-8");
  }
});

describe("output flag", () => {
  test("that --output flag works", () => {
    const result = outputCheck("--output");
    expect(result).toMatchInlineSnapshot(`
      "a:
        b: World
        z: Hello
      b:
        a: 3
        v: 2
        z: 1
      c:
        a: Foo
        c: Baz
        d: Bar
      "
    `);
  });

  test("that -o flag works", () => {
    const result = outputCheck("-o");
    expect(result).toMatchInlineSnapshot(`
      "a:
        b: World
        z: Hello
      b:
        a: 3
        v: 2
        z: 1
      c:
        a: Foo
        c: Baz
        d: Bar
      "
    `);
  });

  function outputCheck(flag) {
    execSync(
      `node index.js --input ${tmpDir}/simple.yml ${flag} ${tmpDir}/output.yml`
    );

    // It should have created a new file
    const files = fs.readdirSync(tmpDir);
    expect(files.length).toBe(2);
    expect(files).toEqual(["output.yml", "simple.yml"]);

    return fs.readFileSync(`${tmpDir}/output.yml`, "utf-8");
  }
});

describe("dry-run flag", () => {
  test("that --dry-run flag works", () => {
    const result = dryRunCheck("--dry-run");
    expect(result).toMatchInlineSnapshot(`
      "a:
        b: World
        z: Hello
      b:
        a: 3
        v: 2
        z: 1
      c:
        a: Foo
        c: Baz
        d: Bar

      "
    `);
  });

  test("that -d flag works", () => {
    const result = dryRunCheck("-d");
    expect(result).toMatchInlineSnapshot(`
      "a:
        b: World
        z: Hello
      b:
        a: 3
        v: 2
        z: 1
      c:
        a: Foo
        c: Baz
        d: Bar

      "
    `);
  });

  test("that -d with true", () => {
    const result = dryRunCheck("-d true");
    expect(result).toMatchInlineSnapshot(`
      "a:
        b: World
        z: Hello
      b:
        a: 3
        v: 2
        z: 1
      c:
        a: Foo
        c: Baz
        d: Bar

      "
    `);
  });

  function dryRunCheck(flag) {
    const result = execSync(
      `node index.js --input ${tmpDir}/simple.yml ${flag}`
    );

    // It should have run without creating a file because it was dry run
    const files = fs.readdirSync(tmpDir);
    expect(files.length).toBe(1);
    expect(files).toEqual(["simple.yml"]);

    return result.toString();
  }
});

describe("indent flag", () => {
  test("that --indent flag works", () => {
    const result = indentCheck("--indent");
    expect(result).toMatchInlineSnapshot(`
      "a:
              b: World
              z: Hello
      b:
              a: 3
              v: 2
              z: 1
      c:
              a: Foo
              c: Baz
              d: Bar
      "
    `);
  });

  test("that -id flag works", () => {
    const result = indentCheck("--id");
    expect(result).toMatchInlineSnapshot(`
      "a:
              b: World
              z: Hello
      b:
              a: 3
              v: 2
              z: 1
      c:
              a: Foo
              c: Baz
              d: Bar
      "
    `);
  });

  function indentCheck(flag) {
    execSync(`node index.js --input ${tmpDir}/simple.yml ${flag} 8`);

    // It should have overwritten the file and not create a new one
    // with an indent of 8
    const files = fs.readdirSync(tmpDir);
    expect(files.length).toBe(1);
    expect(files).toEqual(["simple.yml"]);

    return fs.readFileSync(`${tmpDir}/simple.yml`, "utf-8");
  }
});

describe("help flag", () => {
  test("that --help flag works", () => {
    const result = helpCheck("--help");
    expect(result).toMatchInlineSnapshot(`
      "Usage: yml-sorter [options]

      Options:
            --version       Show version number  [boolean]
        -i, --input         The yml file which needs to be sorted  [required]
        -o, --output        The file to wich to write the output
        -d, --dry-run       Only outputs the proposed sort to the terminal  [boolean] [default: false]
            --indent, --id  Indentation width to use (in spaces)  [default: 2]
        -h, --help          Show help  [boolean]

      Examples:
        yml-sorter --input application-yml                       Sorts the file application.yml alphabetically.
        yml-sorter --input application-yml --output dragons.yml  Sorts and writes the output to dragons.yml
        yml-sorter --input application-yml --dry-run             Writes the output to the terminal
        yml-sorter --input application-yml --indent 4            Indent with 4 spaces

      With love from 42.nl
      "
    `);
  });

  test("that -h flag works", () => {
    const result = helpCheck("-h");
    expect(result).toMatchInlineSnapshot(`
      "Usage: yml-sorter [options]

      Options:
            --version       Show version number  [boolean]
        -i, --input         The yml file which needs to be sorted  [required]
        -o, --output        The file to wich to write the output
        -d, --dry-run       Only outputs the proposed sort to the terminal  [boolean] [default: false]
            --indent, --id  Indentation width to use (in spaces)  [default: 2]
        -h, --help          Show help  [boolean]

      Examples:
        yml-sorter --input application-yml                       Sorts the file application.yml alphabetically.
        yml-sorter --input application-yml --output dragons.yml  Sorts and writes the output to dragons.yml
        yml-sorter --input application-yml --dry-run             Writes the output to the terminal
        yml-sorter --input application-yml --indent 4            Indent with 4 spaces

      With love from 42.nl
      "
    `);
  });

  function helpCheck(flag) {
    const result = execSync(`node index.js ${flag}`);

    return result.toString();
  }
});

const examplesDir = "./examples";

// Clears / creates tmp directory and copies all examples so they
// remain pristine.
function prepareTmpDirectory() {
  if (fs.existsSync(tmpDir)) {
    fs.rmdirSync(tmpDir, { recursive: true });
  }
  fs.mkdirSync(tmpDir);

  const result = fs.readdirSync(examplesDir);
  result.forEach((file) => {
    fs.copyFileSync(`${examplesDir}/${file}`, `${tmpDir}/${file}`);
  });
}
