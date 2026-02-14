export function renderGrid(grid, ROWS, COLS, ctx, RESOLUTION) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? 'black' : 'white';
      ctx.fill();
      ctx.stroke();
    }
  }
}

export function updateGrid(grid, ROWS, COLS) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      const neighbours = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
      let numOfAlive = 0;
      neighbours.forEach((nPos) => {
        const pos = [row + nPos[0], col + nPos[1]];
        // 計算対象のセルがグリッドの中のものだけを計算対象にして生存数を加算
        if (pos.every((e) => e >= 0 && e < 50)) {
          numOfAlive += grid[pos[0]][pos[1]];
        }
      });
      // 対象セルが生存の場合の周囲のセルの生存数
      // * ２未満なら or ４以上なら false(dead)
      // * ２、３なら true(alive)
      // 対象セイルが死の場合の周囲のセルの生存数
      // * ３なら true(alive)
      // * ３以外なら false(dead)
      if (nextGrid[row][col] === true) {
        if (numOfAlive >= 2 && numOfAlive <= 3) {
          nextGrid[row][col] = true;
        } else {
          nextGrid[row][col] = false;
        }
      } else {
        if (numOfAlive === 3) {
          nextGrid[row][col] = true;
        } else {
          nextGrid[row][col] = false;
        }
      }
    }
  }
  return nextGrid;
}
