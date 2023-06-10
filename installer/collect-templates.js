import fs from "fs";
import { capitalize, replaceHyphensWithSpaces } from "./utils.js";

export function collectTemplates() {
  // Specify the directory path
  const directoryPath = ".";

  let templateDirectories = [];

  try {
    // Read the contents of the directory synchronously
    const files = fs.readdirSync(directoryPath);

    // Filter the directory names that begin with 'template-'
    templateDirectories = files.filter(
      (file) => fs.statSync(file).isDirectory() && file.startsWith("template-")
    );
  } catch (err) {
    console.error("Error reading directory:", err);
  }

  const templates = [];

  templateDirectories.forEach((dirName) => {
    const filePath = `${dirName}/description.txt`;
    try {
      const content = fs.readFileSync(filePath, "utf-8");

      // Turn the directory name into a human-friendly template name
      const title = capitalize(
        replaceHyphensWithSpaces(dirName.replace("template-", ""))
      );

      templates.push({
        title,
        description: content,
        dirName: dirName,
      });
    } catch (err) {
      console.error(`Error reading file ${filePath}:`, err);
    }
  });

  return templates;
}
