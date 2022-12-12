const { readFileSync } = require('fs');

const input = readFileSync('./input.txt', 'utf-8');

// Split and parse input
function buildGrid(input) {
  return input.split('\n').map((line) => line.split('').map(parseFloat));
}

function getTreeScenicScore(grid, rowIndex, colIndex) {
  const currentRow = grid[rowIndex];
  const currentTree = currentRow[colIndex];

  const scores = { east: 0, west: 0, north: 0, south: 0 };

  // Eastbound
  for (let index = colIndex + 1; index < currentRow.length; index++) {
    scores.east++;
    if (currentRow[index] >= currentTree) break;
  }

  // Westbound
  for (let index = colIndex - 1; index >= 0; index--) {
    scores.west++;
    if (currentRow[index] >= currentTree) break;
  }

  // Northbound
  for (let index = rowIndex - 1; index >= 0; index--) {
    scores.north++;
    if (grid[index][colIndex] >= currentTree) break;
  }

  // Southbound
  for (let index = rowIndex + 1; index < grid.length; index++) {
    scores.south++;
    if (grid[index][colIndex] >= currentTree) break;
  }

  return Object.values(scores).reduce(
    (total, score) => (total *= score || 1),
    1
  );
}

function getHighestScenicScore(grid) {
  return grid.reduce((highestGridScore, row, rowIndex) => {
    return Math.max(
      highestGridScore,
      row.reduce((highestRowScore, _, colIndex) => {
        const treeScore = getTreeScenicScore(grid, rowIndex, colIndex);
        return Math.max(highestRowScore, treeScore);
      }, 0)
    );
  }, 0);
}

// Test the data input
const grid = buildGrid(input);
const highestScenicScore = getHighestScenicScore(grid);

console.log({ highestScenicScore });
