import fs from "fs";

export function copyTemplate(template) {
  console.log(`Copying template "${template.title}"...`);
  console.log(`>>> : ${JSON.stringify(template)}`);

  try {
    // Copy the template directory
    fs.copySync(template.dirName, "./");
  } catch (err) {
    console.error("Error copying template files:", err);
    process.exit(1);
  }
}
