import fs from "node:fs";

try {
  const data = fs.readFileSync("file.txt", "utf8");
  const arrSplit = data.split("\n").map((item) => item.split(""));
  console.log(arrSplit);
} catch (error) {
  console.error(error);
}

// object per row
