import fs from "fs";
import path from "path";

import { capitalize, replaceHyphensWithSpaces } from "./utils.js";

export function collectTemplates(packageRoot) {
  let templateDirectories = [];

  try {
    // Read the contents of the directory synchronously
    const files = fs.readdirSync(packageRoot);

    // Filter the directory names that begin with 'template-'
    templateDirectories = files.filter(
      (file) =>
        fs.statSync(path.resolve(packageRoot, file)).isDirectory() &&
        file.startsWith("template-")
    );
  } catch (err) {
    console.error("Error reading directory:", err);
  }

  const templates = [];

  templateDirectories.forEach((dirName) => {
    const absoluteDirPath = path.resolve(packageRoot, dirName);
    const filePath = `${absoluteDirPath}/description.txt`;
    try {
      const content = fs.readFileSync(filePath, "utf-8");

      // Turn the directory name into a human-friendly template name
      const title = capitalize(
        replaceHyphensWithSpaces(dirName.replace("template-", ""))
      );

      templates.push({
        title,
        description: content,
        dirName: absoluteDirPath,
      });
    } catch (err) {
      console.error(`Error reading file ${filePath}:`, err);
    }
  });

  return templates;
}
