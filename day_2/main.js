// part 1
const fs = require("node:fs");

const getReports = () => {
    try {
        const data = fs.readFileSync("input.txt", "utf8").split("\n");
        const reportsArr = data.map((str) => str.split(" ").map(Number));
        return reportsArr;
    } catch (err) {
        console.log(err);
    }
};

const isValidReport = (list) => {
    if (isAscending(list) || isDecending(list)) {
        if (isWithinthree(list)) {
            return true;
        }
    }
    // console.log("I am false", list);
    return false;
};

const isAscending = (list) => {
    for (let i = 1; i < list.length; i++) {
        // [0, 1, 3, 4]
        if (list[i - 1] > list[i]) {
            // console.log("I am not ascending", list);
            return false;
        }
    }
    return true;
};

const isDecending = (list) => {
    for (let i = 1; i < list.length; i++) {
        // [4, 2, 1, 2]
        if (list[i - 1] < list[i]) {
            // console.log("I am not descending", list);
            return false;
        }
    }
    return true;
};

const isWithinthree = (list) => {
    for (let i = 1; i < list.length; i++) {
        const difference = Math.abs(list[i] - list[i - 1]);
        if (difference < 1 || difference > 3) {
            return false;
        }
    }
    return true;
};

const getTotalValidReport = (lists) => {
    let totalValid = 0;
    for (const list of lists) {
        if (list.length > 1 && (isValidReport(list) || isStillSafe(list))) {
            totalValid++;
        }
    }
    return totalValid;
};

// part 2
const isStillSafe = (list) => {
    for (let i = 0; i < list.length; i++) {
        const copy = [...list];
        copy.splice(i, 1);
        if (isValidReport(copy)) {
            return true;
        }
    }
    return false;
};

const reports = getReports();
const validReport = getTotalValidReport(reports);

const test = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
    [0],
];

console.log(validReport);
console.log(getTotalValidReport(test));
