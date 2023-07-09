function showWebQuickstart() {
  console.log(`│ QUICK START GUIDE `);
  console.log(`├━━━━━━━━━━━━━━━━━━━`);
  console.log("│ 1. Run `npm install` or `yarn`");
  console.log("│ 2. Run `npm run start` or `yarn start`");
  console.log("│ 3. Open `http://localhost:1234` in your browser");
  console.log(
    "│ 4. Edit the code in `./assembly/index.as.ts` or other files under `./assembly` "
  );
  console.log(
    "│ 5. The browser will automatically reload and show your changes"
  );
  console.log("│ 6. Please consult `README.md` in this directory.");
  console.log("│\n│ Thank you for choosing Codument!");
  console.log("├─────────────────────────────────┐");
  console.log("│       https://codument.com      │");
  console.log("└─────────────────────────────────┘");
}
function showNodeQuickstart() {
  console.log(`│ QUICK START GUIDE `);
  console.log(`├━━━━━━━━━━━━━━━━━━━`);
  console.log("│ 1. Run `npm install` or `yarn`");
  console.log("│ 2. Run `npm run start` or `yarn start`");
  console.log("│ 3. The WASM output should appear on the screen");
  console.log(
    "│ 4. Edit the code in `./assembly/index.as.ts` or other files under `./assembly` "
  );
  console.log(
    "│ 5. The browser will automatically reload and show your changes"
  );
  console.log("│ 6. Please consult `README.md` in this directory.");
  console.log("│\n│ Thank you for choosing Codument!");
  console.log("├─────────────────────────────────┐");
  console.log("│       https://codument.com      │");
  console.log("└─────────────────────────────────┘");
}

export function showQuickstart(templateTitle) {
  const isNode = templateTitle.toLowerCase().includes("node ");
  const displayFunction = isNode ? showNodeQuickstart : showWebQuickstart;

  console.log(`\n\n`);
  displayFunction();
  console.log(`\n\n`);
}
