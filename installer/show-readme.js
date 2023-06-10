import fs from "fs";
import { boldLine } from "./utils.js";

export function showReadme() {
  const filePath = "README.md";

  try {
    const data = fs.readFileSync(filePath, "utf8");

    console.log("\n\n" + boldLine + "\n README:\n" + boldLine);
    console.log(data);
    console.log(boldLine + "\n\n");
  } catch (err) {
    console.error(`Error reading 'README.md' file: ${err}`);
  }
}
