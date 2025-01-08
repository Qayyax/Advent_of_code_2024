const fs = require("node:fs");

const test = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;

const getData = (input) => {
    const data = fs.readFileSync(input).toString("ascii");
    const firstSplit = data.split("\n").filter((line) => line.trim() !== "");
    const secondSplit = firstSplit.map((order) => order.split(":"));
    //[ '2654256', ' 8 1 9 6 8 4 5 766 6 2 9 49' ],
    const thirdSplit = secondSplit.map((order) => {
        order[0] = Number(order[0]);
        const num = order[1].trim().split(" ").map(Number);
        order[1] = num;
        return order;
    });
    // [ 161291, [ 9, 28, 640, 9, 2 ] ]
    return thirdSplit;
};

const getCombinations = (len) => {
    const combinations = [];
    const symbols = ["*", "+"];

    const generateCombinations = (combination) => {
        if (combination.length === len) {
            combinations.push([...combination]);
            return;
        }

        for (const symbol of symbols) {
            combination.push(symbol);
            generateCombinations(combination);
            combination.pop();
        }
    };
    generateCombinations([]);
    return combinations;
};

const solveOperation = (arr, opArr) => {
    // arr [1, 2, 3, 4, 5]
    // opArr [*, + , * , *]
    let total = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (opArr[i - 1] === "*") {
            total *= arr[i];
        } else {
            total += arr[i];
        }
    }
    return total;
};

const checkCombination = (operation) => {
    const result = operation[0];
    const operations = operation[1];
    const len = operations.length - 1;
    const combinations = getCombinations(len);
    for (const combination of combinations) {
        const answer = solveOperation(operations, combination);
        console.log(`Result (${result}): ${operations} = ${answer}`);
        if (answer === result) {
            return true;
        }
    }
    return false;
};

const solution = () => {
    const data = getData("input");
    let total = 0;
    for (const test of data) {
        const result = test[0];
        if (checkCombination(test)) {
            total += result;
        }
    }
    return total;
};

console.log(solution());

module.exports = { getData };
