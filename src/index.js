// step 1: convert ttf to woff
import path from "path";
import bulkConvert from "./bulkConvert.js";
import { trimttf } from "./trimcss.js";
import fs from "fs";
import { copy } from "fs-extra";

export async function process(inputDir = "./input/", outputDir = "./output/") {
  const input = path.resolve(inputDir);
  const output = path.resolve(outputDir);
  const ttf = path.join(input, "ttf");
  const woff = path.join(output, "woff");
  const woff2 = path.join(input, "woff2");
  fs.mkdirSync(output, { recursive: true });
  fs.mkdirSync(woff, { recursive: true });

  console.log("making woff from ttf");
  try {
    bulkConvert(ttf, woff);
  } catch (err) {
    console.error(err);
  }

  console.log("copying woff2");
  try {
    copy(woff2, path.join(output, "woff2"));
  } catch (err) {
    console.error(err);
  }

  console.log("trimming css");
  try {
    const dir = await fs.promises.opendir(input);
    for await (const dirent of dir) {
      if (dirent.isFile() && path.extname(dirent.name) == ".css") {
        const file = path.join(input, dirent.name);
        console.log(`found css at ${path.join(input, dirent.name)}`);
        trimttf(file, path.join(outputDir, dirent.name));
      }
    }
  } catch (err) {
    console.error(err);
  }
}

process();
