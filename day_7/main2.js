const { getData } = require("./main.js");

const getCombinations = (len) => {
    const combinations = [];
    const symbols = ["*", "+", "||"];

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
    // opArr [*, + , * , ||]
    let total = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (opArr[i - 1] === "*") {
            total *= arr[i];
        } else if (opArr[i - 1] === "+") {
            total += arr[i];
        } else {
            let stringTotal = total.toString();
            let current = arr[i].toString();
            total = Number(stringTotal + current);
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
