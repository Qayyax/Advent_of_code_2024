const fs = require("node:fs");

const getData = (file) => {
    const data = fs.readFileSync(file).toString("ascii");
    const matrix = data
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((str) => str.split(""));
    return matrix;
};

const getDirection = (str) => {
    const direction = {
        "^": [-1, 0],
        ">": [0, 1],
        v: [1, 0],
        "<": [0, -1],
    };
    return direction[str] || [0, 0];
};

const getPosition = (matrix) => {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            const current = matrix[row][col];
            if (["^", ">", "v", "<"].includes(current)) {
                return [row, col, current];
            }
        }
    }
    return null;
};

const game = (matrix, startX, startY, blockX, blockY, startDirection) => {
    const nRow = matrix.length;
    const nCol = matrix[0].length;

    const visited = new Set();
    let x = startX;
    let y = startY;
    let direction = startDirection;

    while (true) {
        // initial current state
        const state = `${x},${y},${direction}`;
        if (visited.has(state)) {
            return true;
        }
        visited.add(state);

        // check for next position
        const [dx, dy] = getDirection(direction);
        const nx = x + dx;
        const ny = y + dy;

        // is next position blocked
        const isBlocked =
            nx < 0 ||
            nx >= nRow ||
            ny < 0 ||
            ny >= nCol ||
            matrix[nx][ny] === "#" ||
            (nx === blockX && ny === blockY);

        if (isBlocked) {
            // Change direction without moving
            direction =
                direction === "^"
                    ? ">"
                    : direction === ">"
                        ? "v"
                        : direction === "v"
                            ? "<"
                            : "^";
        } else {
            // Move to next position
            x = nx;
            y = ny;
        }

        // check maximum number of directions [^, >, <, v]
        if (visited.size > nRow * nCol * 4) {
            return false;
        }

        // If we've moved to a position that would make us leave the grid next
        const [nextDx, nextDy] = getDirection(direction);
        const nextX = x + nextDx;
        const nextY = y + nextDy;
        if (nextX < 0 || nextX >= nRow || nextY < 0 || nextY >= nCol) {
            return false;
        }
    }
};

const gameTwo = (matrix) => {
    let validLoopCount = 0;
    const [startX, startY, startDirection] = getPosition(matrix);
    const nRow = matrix.length;
    const nCol = matrix[0].length;

    for (let row = 0; row < nRow; row++) {
        for (let col = 0; col < nCol; col++) {
            if (row === startX && col === startY) continue;
            if (matrix[row][col] === "#") continue;

            if (game(matrix, startX, startY, row, col, startDirection)) {
                validLoopCount++;
            }
        }
    }
    return validLoopCount;
};

const data = getData("input");
const result = gameTwo(data);
console.log(`${result} valid loops`);
