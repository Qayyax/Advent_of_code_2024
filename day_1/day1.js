const fs = require("node:fs");

const splitArrBySpace = (arr) => {
    if (!arr.trim()) return [];
    const data = arr.split(/\s+/).map((num) => Number(num));
    return data;
};

const twoArr = (arr) => {
    const leftArr = [];
    const rightArr = [];
    for (const ar of arr) {
        if (ar.length >= 2 && ar[0] > 0 && ar[1] > 0) {
            leftArr.push(ar[0]);
            rightArr.push(ar[1]);
        }
    }
    leftArr.sort((a, b) => a - b);
    rightArr.sort((a, b) => a - b);
    return [leftArr, rightArr];
};

const getTextArr = (fileName) => {
    try {
        const data = fs.readFileSync(fileName, "utf8");
        const dataArr = data.split("\n").map((arr) => splitArrBySpace(arr));
        return twoArr(dataArr);
    } catch (err) {
        console.log(err);
    }
};

const getDistance = (left, right) => {
    const n = left.length;
    const distance = [];
    for (let i = 0; i < n; i++) {
        let difference = Math.abs(left[i] - right[i]);
        distance.push(difference);
    }
    const totalDistance = distance.reduce((prev, curr) => prev + curr, 0);
    return totalDistance;
};

const [leftArr, rightArr] = getTextArr("day1.txt");
const totalDistance = getDistance(leftArr, rightArr);
console.log(totalDistance);

// Part 2

const countAppearance = (num, arr) => {
    const occurence = arr.filter((item) => item === num);
    return occurence.length;
};

const getSingularityScore = (arr1, arr2) => {
    const singularity = [];
    arr1.forEach((arr) => {
        const count = countAppearance(arr, arr2);
        singularity.push(arr * count);
    });
    const singularityTotal = singularity.reduce((prev, curr) => prev + curr, 0);
    return singularityTotal;
};

const singularitySore = getSingularityScore(leftArr, rightArr);
console.log(singularitySore);
