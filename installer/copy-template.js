import fs from "fs";

export function copyTemplate(template) {
  console.log(`\n Copying template "${template.title}"...\n`);

  try {
    // Copy the template  to the user's directory
    fs.cpSync(template.dirName, "./", { recursive: true });
  } catch (err) {
    console.error("Error copying template files:", err);
    process.exit(1);
  }
}
