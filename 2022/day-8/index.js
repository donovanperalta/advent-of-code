const { readFileSync } = require('fs');

const input = readFileSync('./input.txt', 'utf-8');

// Split and parse input
function buildGrid(input) {
  return input.split('\n').map((line) => line.split('').map(parseFloat));
}

function isTreeVisible(grid, rowIndex, colIndex) {
  /* Trees around the edges */
  if (
    rowIndex === 0 ||
    colIndex === 0 ||
    rowIndex === grid.length - 1 ||
    colIndex === grid[0].length - 1
  ) {
    return true;
  }

  const currentRow = grid[rowIndex];
  const currentTree = currentRow[colIndex];

  /* Westbound trees */
  const westbound = currentRow.slice(0, colIndex);
  if (westbound.every((tree) => currentTree > tree)) return true;

  /* Eastbound trees */
  const eastbound = currentRow.slice(colIndex + 1, currentRow.length);
  if (eastbound.every((tree) => currentTree > tree)) return true;

  // Northbound trees
  let blocked = false;

  for (let index = 0; index < rowIndex; index++) {
    const tree = grid[index][colIndex];

    if (tree >= currentTree) {
      blocked = true;
      break;
    }
  }

  if (!blocked) return true;

  // Southbound trees
  blocked = false;

  for (let index = rowIndex + 1; index < grid.length; index++) {
    const tree = grid[index][colIndex];

    if (tree >= currentTree) {
      blocked = true;
      break;
    }
  }

  return !blocked;
}

/* Test the input */
const grid = buildGrid(input);

const visibleTreeCount = grid.reduce((total, row, rowIndex) => {
  row.forEach((_, colIndex) => {
    const visible = isTreeVisible(grid, rowIndex, colIndex);
    if (visible) total++;
  });

  return total;
}, 0);

console.log({ visibleTreeCount });
