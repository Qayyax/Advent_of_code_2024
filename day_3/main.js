const fs = require("node:fs");

const getInstructions = () => {
    const regexExp = /mul\(\d{1,3},\d{1,3}\)/g;
    try {
        const data = fs.readFileSync("input").toString("ascii");
        const matches = [...data.matchAll(regexExp)].map((m) => m[0]);
        return matches.map(extractNum);
    } catch (err) {
        console.log(err);
    }
};

const extractNum = (str) => {
    const regexExp = /[^,\d{1,3}]/g;
    const replaced = str.replace(regexExp, "");
    const splited = replaced.split(",").map(Number);
    return splited;
};

const mul = (arr) => {
    if (arr.length > 2 || arr.length < 2) return 0;
    return arr[0] * arr[1];
};

const solution = () => {
    const instructions = getInstructions();
    let total = 0;
    for (const instruction of instructions) {
        const answer = mul(instruction);
        total += answer;
    }
    return total;
};

console.log(solution());

// part 2
const getDoInstructions = () => {
    const regexExp = /(do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\))/g;
    try {
        const data = fs.readFileSync("input").toString("ascii");
        const matches = [...data.matchAll(regexExp)].map((m) => m[0]);
        return matches;
    } catch (err) {
        console.log(err);
    }
};

const solution2 = () => {
    const instructions = getDoInstructions();
    let currInstruction = "do()";
    let total = 0;

    for (const instruction of instructions) {
        const mulType = /mul\(\d{1,3},\d{1,3}\)/.test(instruction);
        if (currInstruction === "do()") {
            if (mulType) {
                const numberExtracted = extractNum(instruction);
                const answer = mul(numberExtracted);
                total += answer;
            } else if (instruction === "don't()") {
                currInstruction = "don't()";
            }
        } else if (currInstruction === "don't()") {
            if (instruction === "do()") {
                currInstruction = "do()";
            }
        }
    }
    return total;
};

console.log(solution2());
