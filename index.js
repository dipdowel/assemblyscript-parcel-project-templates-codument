#!/usr/bin/env node
"use strict";

import readline from "readline";
import { drawMenuTable } from "./installer/draw-menu-table.js";
import { collectTemplates } from "./installer/collect-templates.js";
import { copyTemplate } from "./installer/copy-template.js";

//######################################################################################################################

//######################################################################################################################
// process.exit(0);
//######################################################################################################################

const templates = collectTemplates();

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
const boldLine = "━".repeat(81);

// Function to display the menu and handle user input
function displayMenu() {
  console.log(`${"\n".repeat(
    100
  )}${boldLine}\n Choose a desired template for your AssemblyScript project${
    errorMessage ? "\n " + errorMessage : ""
  }
${boldLine}`);

  drawMenuTable(tableData);

  // Prompt the user for input
  rl.question(`Select a template you want [${onScreenChoices}]: `, (choice) => {
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
      process.exit(0);
    } else {
      errorMessage = `"${choice}" was an invalid choice. Try again please.`;
      displayMenu();
    }
  });
}

// Start the menu
displayMenu();
