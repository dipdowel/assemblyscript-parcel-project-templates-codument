#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const readline = require("readline");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
    templates.push({
      name: dirName.replace("template-", ""),
      description: content,
      dirName: dirName,
    });
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
});

// console.log(`>>> templateDirectories: ${JSON.stringify(templateDirectories)}`);
// console.log(`>>> templates: ${JSON.stringify(templates)}`);

// Create an interface for reading from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to display the menu and handle user input
function displayMenu() {
  console.log("\n==== Menu ====");

  templates.forEach((template, index) => {
    console.log(`${index + 1}. ${template.name} - ${template.description}`);
  });

  console.log("0. Exit");

  // Prompt the user for input
  rl.question("Select an option: ", (choice) => {
    // Process the user's choice
    switch (choice) {
      case "1":
        console.log("You selected Option 1");
        // Add code for Option 1
        break;
      case "2":
        console.log("You selected Option 2");
        // Add code for Option 2
        break;
      case "3":
        console.log("You selected Option 3");
        // Add code for Option 3
        break;
      case "0":
        console.log("Exiting...");
        rl.close();
        return;
      default:
        console.log("Invalid choice. Please try again.");
    }

    // Display the menu again
    displayMenu();
  });
}

// Start the menu
displayMenu();

//
// // Get the current working directory
// const cwd = process.cwd();
//
// // Define the path to your template project's source files
// const templatePath = path.join(__dirname, 'template');
//
// // Define the destination path where the template will be copied
// const destinationPath = cwd;
//
// console.log(`>>> cwd: ${JSON.stringify(cwd)}`)
// console.log(`>>> templatePath: ${JSON.stringify(cwd)}`)
// console.log(`>>> destinationPath: ${JSON.stringify(cwd)}`)
//
//
// process.exit(0);
//
//
// // Copy files recursively from the template directory to the destination
// const copyFiles = (src, dest) => {
//     // Get the list of files and directories in the source path
//     const files = fs.readdirSync(src);
//
//     // Create the destination directory if it doesn't exist
//     if (!fs.existsSync(dest)) {
//         fs.mkdirSync(dest);
//     }
//
//     // Iterate over each file/directory in the source
//     files.forEach((file) => {
//         const srcPath = path.join(src, file);
//         const destPath = path.join(dest, file);
//
//         // Check if the current item is a directory
//         if (fs.statSync(srcPath).isDirectory()) {
//             // Recursively copy the directory
//             copyFiles(srcPath, destPath);
//         } else {
//             // Copy the file to the destination
//             fs.copyFileSync(srcPath, destPath);
//         }
//     });
// };
//
// // Copy the template project files to the destination
// copyFiles(templatePath, destinationPath);
//
// // Install dependencies if a package.json file is present in the template
// const packageJsonPath = path.join(destinationPath, 'package.json');
// if (fs.existsSync(packageJsonPath)) {
//     console.log('Installing dependencies...');
//     execSync('npm install', { cwd: destinationPath, stdio: 'inherit' });
// }
//
// console.log('Template project created successfully!');
