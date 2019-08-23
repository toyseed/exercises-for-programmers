/**
 * exercise 45 word finder
 */

const fs = require('fs');
const path = require('path');

const convert = (() => {
  const config = fs.readFileSync(
    path.format({ dir: __dirname, name: 'word-finder-config.json' })
  );
  const rules = JSON.parse(config);

  return function(content) {
    let counts = [];

    for (let rule of rules) {
      let from = rule['from'];
      let to = rule['to'];

      let fromRegex = new RegExp(from, 'g');
      let match = content.match(fromRegex);

      counts.push({ word: from, count: match ? match.length : 0 });
      content = content.replace(fromRegex, to);
    }

    return {
      counts,
      content
    };
  };
})();

function execute(base) {
  let result = [];

  (function _execute(base) {
    const filenames = fs.readdirSync(base);
    for (let filename of filenames) {
      let filepath = path.format({ dir: base, name: filename });
      let filestat = fs.statSync(filepath);

      if (filestat.isDirectory()) {
        _execute(filepath);
      } else {
        let content = fs.readFileSync(filepath, { encoding: 'utf-8' });
        let converted = convert(content);
        result.push({
          filepath,
          converted
        });
      }
    }
  })(base);

  return result;
}

function writeToFile(filepath, content) {
  const parsed = path.parse(filepath);
  const output = path.format({
    dir: parsed.dir,
    name: parsed.name + '.output'
  });

  fs.writeFileSync(output, content, { encoding: 'utf-8' });
}

function main() {
  const targetDir = path.format({ dir: __dirname, name: 'word-finder' });
  const results = execute(targetDir);

  for (let {
    filepath,
    converted: { counts, content }
  } of results) {
    console.log(filepath);
    let countTotal = 0;
    for (let count of counts) {
      console.log(`"${count.word}" is changed ${count.count} times.`);
      countTotal += count.count;
    }
    console.log('\n');

    if (countTotal > 0) {
      writeToFile(filepath, content);
    }
  }
  process.exit(0);
}

main();
