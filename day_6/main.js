const fs = require("node:fs");

const input = "input";
const test = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

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
    const position = [];
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            const current = matrix[row][col];
            if (["^", ">", "v", "<"].includes(current)) {
                position.push(row);
                position.push(col);
                return position;
            }
        }
    }
    return position;
};

const notOutofBound = (matrix) => {
    const nRow = matrix.length;
    const nCol = matrix[0].length;

    const [x, y] = getPosition(matrix);
    if (x < 0 || x >= nRow || y < 0 || y >= nCol) {
        return false;
    }

    const positionValue = matrix[x][y];
    const [r, c] = getDirection(positionValue);

    const nx = x + r;
    const ny = y + c;

    if (nx >= 0 && nx < nRow && ny >= 0 && ny < nCol) {
        return [nx, ny];
    }

    return false;
};

const countPosition = (matrix) => {
    let count = 0;
    for (let row = 0; row < matrix.length; row++) {
        const poundArr = matrix[row].filter((item) => item === "X");
        count += poundArr.length;
    }
    return count;
};

const game = (matrix) => {
    let goneOut = false;
    const visitedStates = new Set();

    while (!goneOut) {
        const outOfBound = notOutofBound(matrix);
        if (outOfBound === false) {
            goneOut = true;
            break;
        }

        const [x, y] = getPosition(matrix);
        const value = matrix[x][y];
        const [nx, ny] = outOfBound;

        const currentState = `${x},${y},${value}`;

        // If we've seen this exact state before, we're in a loop
        if (visitedStates.has(currentState)) {
            return true;
        }
        visitedStates.add(currentState);

        // checks if the next position is '#'
        if (matrix[nx][ny] === "#" || matrix[nx][ny] === "O") {
            // change direction
            switch (value) {
                case "^":
                    matrix[x][y] = ">";
                    break;
                case ">":
                    matrix[x][y] = "v";
                    break;
                case "v":
                    matrix[x][y] = "<";
                    break;
                case "<":
                    matrix[x][y] = "^";
                    break;
            }
        } else {
            matrix[x][y] = "X";
            matrix[nx][ny] = value;
        }
        // count maximum number of unique possible states is n×m×4
        if (visitedStates.size > matrix.length * matrix[0].length * 4) {
            return false;
        }
    }
    // initial position + 1
    // const positionCount = countPosition(matrix) + 1;
    // console.log(positionCount);
    // return false if the guard leaves the region
    return false;
};

const data = getData(input);
// game(data);

// part 2
//

const gameTwo = (matrix) => {
    let validLoopCount = 0;
    const [initX, initY] = getPosition(matrix);

    const nRow = matrix.length;
    const nCol = matrix[0].length;
    console.log(`Initial position: (${initX}, ${initY})`);
    console.log(`Grid size: ${nRow}x${nCol}`);

    // set every row and column with a block "O"
    for (let row = 0; row < nRow; row++) {
        for (let col = 0; col < nCol; col++) {
            if (row === initX && col === initY) {
                continue;
            }

            if (matrix[row][col] === "#") {
                continue;
            }

            const matrixCopy = matrix.map((arr) => [...arr]);
            matrixCopy[row][col] = "O";

            const isGame = game(matrixCopy);

            if (isGame) {
                validLoopCount++;
                console.log("currently:", validLoopCount);
                console.log(`Found loop with obstacle at (${row}, ${col})`);
            }
        }
    }
    return validLoopCount;
};

console.log(gameTwo(data));
