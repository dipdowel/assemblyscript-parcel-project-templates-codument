#!/usr/bin/env node
"use strict";

import readline from "readline";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { drawMenuTable } from "./installer/draw-menu-table.js";
import { collectTemplates } from "./installer/collect-templates.js";
import { copyTemplate } from "./installer/copy-template.js";
import { boldLine } from "./installer/utils.js";
import { showQuickstart } from "./installer/show-quickstart.js";

//######################################################################################################################

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageRoot = path.resolve(__dirname, ".");

console.log(packageRoot);

const templates = collectTemplates(packageRoot);

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

  drawMenuTable(tableData);

  console.log(`\n ${errorMessage ? "\n " + errorMessage : ""}\n`);
  // Prompt the user for input
  rl.question(
    ` Select a template you want to use [${onScreenChoices}]: `,
    (choice) => {
      if (choice === "0") {
        console.log("\n\nBye-bye...\n\n");
        rl.close();
        process.exit(0);
      }

      const chosenTemplateNumber = parseInt(choice);

      const isInputValid = validChoices.includes(chosenTemplateNumber);

      if (isInputValid) {
        const templateIndex = chosenTemplateNumber - 1;
        copyTemplate(templates[templateIndex]);
        rl.close();
        showQuickstart(templates[templateIndex].title);
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
