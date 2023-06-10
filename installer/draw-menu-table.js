/**
 * Function to draw a standalone table for a given entry.
 * @param {Object} entry - The data entry to render as a table.
 */
function drawStandaloneTable(entry) {
  // Calculate the table width (80 characters)
  const tableWidth = 80;

  /**
   * Create a row separator line.
   * @returns {string} - The row separator line.
   */
  function createSeparator() {
    return `┌${"─".repeat(tableWidth - 2)}┐`;
  }

  /**
   * Create a row of data.
   * @param {string} content - The content of the row.
   * @returns {string} - The formatted row.
   */
  function createRow(content) {
    const padding = " ".repeat(Math.max(0, tableWidth - content.length - 4));
    return `│ ${content}${padding} │`; // Added padding of 1 space on both sides
  }

  // Draw the table
  console.log(" " + createSeparator());
  console.log(" " + createRow(`[${entry.key}] ${entry.title}`));
  console.log(" " + `├${"─".repeat(tableWidth - 2)}┤`); // Border between upper row and lower row

  // Split the text into lines and draw each line as a row
  const text = entry.description;
  const lines = [];
  let remainingText = text;

  while (remainingText.length > 0) {
    const line = remainingText.slice(0, tableWidth - 4);
    remainingText = remainingText.slice(tableWidth - 4);
    lines.push(line);
  }

  // Draw the text rows
  for (let i = 0; i < lines.length; i++) {
    console.log(" " + createRow(lines[i]));
  }

  // Draw the table bottom border
  console.log(" " + `└${"─".repeat(tableWidth - 2)}┘`);
  console.log();
}

/**
 *  Draw a table in the console
 *  @param {Array} tableData - An array of objects containing the data to display: {number, title, text}
 */
export function drawMenuTable(tableData) {
  tableData.forEach((entry) => {
    drawStandaloneTable(entry);
  });
}
