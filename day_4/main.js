const fs = require("node:fs");

const getData = () => {
    const example = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
    try {
        const data = fs.readFileSync("input").toString("ascii");
        const dataArr = data.split("\n");
        const replaced = dataArr.map(convertStringToNum);
        return replaced;
    } catch (err) {
        console.error(err);
    }
};

const convertStringToNum = (str) => {
    const matrix = [];
    const mapping = {
        X: 1,
        M: 2,
        A: 3,
        S: 4,
    };

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (mapping[char]) {
            matrix.push(mapping[char]);
        }
    }
    return matrix;
};

const getDirection = (matrix, target, x, y, dx, dy) => {
    const numRows = matrix.length;
    const numColumns = matrix[0].length;

    for (let i = 0; i < target.length; i++) {
        const nextRow = x + i * dx;
        const nextCol = y + i * dy;

        if (
            nextRow < 0 ||
            nextRow >= numRows ||
            nextCol < 0 ||
            nextCol >= numColumns
        ) {
            return false;
        }
        if (matrix[nextRow][nextCol] !== target[i]) {
            return false;
        }
    }
    return true;
};

const countMatrix = (matrix, target) => {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    let count = 0;

    for (let x = 0; x < numRows; x++) {
        for (let y = 0; y < numCols; y++) {
            // right
            if (getDirection(matrix, target, x, y, 0, 1)) count++;
            //left
            if (getDirection(matrix, target, x, y, 0, -1)) count++;
            // down
            if (getDirection(matrix, target, x, y, 1, 0)) count++;
            // up
            if (getDirection(matrix, target, x, y, -1, 0)) count++;
            // down-right
            if (getDirection(matrix, target, x, y, 1, 1)) count++;
            // up-left
            if (getDirection(matrix, target, x, y, -1, -1)) count++;
            // down-left
            if (getDirection(matrix, target, x, y, 1, -1)) count++;
            // up-right
            if (getDirection(matrix, target, x, y, -1, 1)) count++;
        }
    }
    return count;
};

const solution = () => {
    const matrix = getData();
    const target = [1, 2, 3, 4];
    const answer = countMatrix(matrix, target);
    console.log(answer);
};

solution();

// part 2

const countMatrixDiag = (matrix) => {
    const nrow = matrix.length;
    const ncol = matrix[0].length;
    let count = 0;

    for (let i = 1; i < nrow - 1; i++) {
        for (let j = 1; j < ncol - 1; j++) {
            if (matrix[i][j] === 3) {
                const topLeft = matrix[i - 1][j - 1];
                const topRight = matrix[i - 1][j + 1];
                const bottomLeft = matrix[i + 1][j - 1];
                const bottomRight = matrix[i + 1][j + 1];

                const diag1IsMAS = topLeft === 2 && bottomRight === 4;
                const diag1IsSAM = topLeft === 4 && bottomRight === 2;

                const diag2IsMAS = topRight === 2 && bottomLeft === 4;
                const diag2IsSAM = topRight === 4 && bottomLeft === 2;

                if ((diag1IsMAS || diag1IsSAM) && (diag2IsMAS || diag2IsSAM)) {
                    count++;
                }
            }
        }
    }
    return count;
};

const solutionTwo = () => {
    const matrix = getData();
    const answer = countMatrixDiag(matrix);
    console.log(answer);
};
solutionTwo();
