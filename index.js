#!/usr/bin/env node
"use strict";

import readline from "readline";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { drawMenuTable } from "./installer/draw-menu-table.js";
import { collectTemplates } from "./installer/collect-templates.js";
import { copyTemplate } from "./installer/copy-template.js";
import { showReadme } from "./installer/show-readme.js";
import { boldLine } from "./installer/utils.js";

//######################################################################################################################

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageRoot = path.resolve(__dirname, ".");

console.log(packageRoot);
//######################################################################################################################
// process.exit(0);
//######################################################################################################################

const templates = collectTemplates(packageRoot);

// console.log(`>>> templates: ${JSON.stringify(templates)}`);
//
// process.exit(0);

const tableData = templates.map((template, index) => ({
  key: index + 1, // we want our templates to be numbered starting from 1
  title: template.title,
  description: template.description,
}));

// Create an interface for reading from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let errorMessage = "";
const validChoices = tableData.map((item) => item.key);
const onScreenChoices = validChoices.join(", ") + ", 0 = exit";

// Function to display the menu and handle user input
function displayMenu() {
  console.log("\n".repeat(100));

  console.log(boldLine);
  console.log(`${" ".repeat(18)}AssemblyScript+Parcel Project Generator`);
  console.log(boldLine + "\n");
  console.log(" WARNING!");
  console.log(" " + "━".repeat(8));

  console.log(
    ` This script will overwrite project files ('package.json', 'tsconfig.json', etc.)`
  );

  console.log(
    " in the current directory. If you don't want it, press 0 and Enter to terminate."
  );
  console.log(` ${errorMessage ? "\n " + errorMessage : ""}\n`);

  drawMenuTable(tableData);
  console.log("");
  // Prompt the user for input
  rl.question(
    `Select a template you want to use [${onScreenChoices}]: `,
    (choice) => {
      if (choice === "0") {
        console.log("\n\nBye-bye...\n\n");
        rl.close();
        process.exit(0);
      }

      const chosenTemplateNumber = parseInt(choice);

      const isInputValid = validChoices.includes(chosenTemplateNumber);

      if (isInputValid) {
        copyTemplate(templates[chosenTemplateNumber - 1]);
        rl.close();
        showReadme();
        process.exit(0);
      } else {
        errorMessage = `"${choice}" was an invalid choice. Try again please.`;
        displayMenu();
      }
    }
  );
}

// Start the menu
displayMenu();
