// this script iterates over a dir of ttf files and outputs a dir of woff files

import fs from "fs";
import path from "path";
import ttf2woff from "ttf2woff";

export default async function bulkConvert(srcDir, dstDir) {
  try {
    const dir = await fs.promises.opendir(srcDir);
    for await (const dirent of dir) {
      if (dirent.isFile() && path.extname(dirent.name) == ".ttf") {
        console.log(`Converting ${dirent.name}`);
        const name = path.basename(dirent.name, ".ttf"); //strip the ext
        convert(
          path.join(srcDir, dirent.name),
          path.join(dstDir, `${name}.woff`)
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
}

function convert(src, dst) {
  const data = fs.readFileSync(src);
  const ttfFont = new Uint8Array(data);
  const woffFont = ttf2woff(ttfFont);
  console.log(`Writing to ${dst}`);
  fs.writeFileSync(dst, woffFont);
}

// thanks
// https://stackoverflow.com/questions/32511789/looping-through-files-in-a-folder-node-js
