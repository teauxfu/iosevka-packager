// this script trims the ttf declarations from Iosevka css files
// expected:
// src: url('woff2/iosevka-thin.woff2') format('woff2'), url('ttf/iosevka-thin.ttf') format('truetype');
// result:
// src: url('woff2/iosevka-thin.woff2') format('woff2');

// accepts absolute src and dst paths, as well as an optional encoding defulting to utf-8

import fs from "fs";
import readline from "readline";

export async function trimttf(src, dst, encoding = "utf-8") {
  if (src) {
    console.log(`Trimming ttf declarations from ${src}`);
    const css = await scrape(src);
    write(dst, css, encoding);
  }
}

function scrape(target) {
  return new Promise((resolve, rejects) => {
    const rd = readline.createInterface({
      input: fs.createReadStream(target),
      output: process.stdout,
      terminal: false,
    });
    // just look for a comma
    // alternatively could skip regex and try splitting all lines at a comma ¯\_(ツ)_/¯
    const regex_pattern = /[,]/gm;
    let css = [];

    rd.on("line", function (line) {
      if (regex_pattern.test(line)) {
        const [woff2, ttf] = line.split(",");
        console.log(`trimmed ${ttf}`);
        css.push(`\n${woff2};`);
      } else {
        css.push(`\n${line}`);
      }
    });

    rd.on("close", () => {
      resolve(css.join(""));
    });
  });
}

function write(dst, css, encoding) {
  fs.writeFile(dst, css, encoding, (err) => {
    if (err) throw err;
    console.log(`Finished trimming ${dst}.`);
  });
}

// thanks
// passing in args to node https://stackoverflow.com/a/5767589/13090245
// using readline https://stackoverflow.com/a/69516562/13090245
// destructuring a string https://stackoverflow.com/a/42185907/13090245
// await readline w/ promise https://stackoverflow.com/a/53981240/13090245
