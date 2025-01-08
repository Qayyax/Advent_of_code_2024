const fs = require("node:fs");

const test = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
const getData = () => {
    const data = fs.readFileSync("input").toString("ascii");
    const [rulesStr, ordersStr] = data.split("\n\n");
    const rules = rulesStr.split("\n").map((rule) => rule.split("|").map(Number));
    const orders = ordersStr
        .split("\n")
        .map((rule) => rule.split(",").map(Number));
    return [rules, orders];
};

const data = getData();

const getDictRules = (arr) => {
    const rules = {};
    for (const [left, right] of arr) {
        if (typeof left !== "number" && typeof right !== "number") continue;
        if (rules[left]) {
            rules[left].push(right);
        } else {
            rules[left] = [right];
        }
    }
    return rules;
};

const isValid = (left, right, dict) => {
    const leftSet = new Set(dict[left] || []);
    const rightSet = new Set(dict[right] || []);
    // Left | right
    // 75 | 47 ? yes : no
    // is right in left? yes valid : no : is left in right? yes not valid : no valid
    if (leftSet.has(right)) {
        return true;
    } else if (rightSet.has(left)) {
        return false;
    } else {
        return true;
    }
};

const checkOrder = (order, rule) => {
    const n = order.length - 1;
    const mid = Math.ceil(n / 2);
    let check = true;
    order.forEach((value, i) => {
        const copy = i < n ? order.slice(i + 1) : order.slice(i);
        for (const right of copy) {
            const valid = isValid(value, right, rule);
            if (!valid) {
                check = false;
                break;
            }
        }
    });
    return check ? order[mid] : check;
};

const rules = getDictRules(data[0]);

const solution = () => {
    let midCount = 0;
    for (const order of data[1]) {
        const check = checkOrder(order, rules);
        if (check) {
            midCount += check;
        }
    }
    console.log(midCount);
};
// solution();

const getIncorrectOrder = () => {
    const incorrect = [];
    for (const order of data[1]) {
        const check = checkOrder(order, rules);
        if (!check) {
            incorrect.push(order);
        }
    }
    return incorrect;
};

const adjustOrder = (order, rule) => {
    const n = order.length;
    const mid = Math.floor(n / 2);

    let isValidOrder = false;

    while (!isValidOrder) {
        isValidOrder = true;

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const valid = isValid(order[i], order[j], rule);
                if (!valid) {
                    [order[i], order[j]] = [order[j], order[i]];
                    isValidOrder = false;
                    break;
                }
            }
            if (!isValidOrder) break;
        }
    }

    return order[mid];
};

const solution2 = () => {
    let midCount = 0;
    const incorrectData = getIncorrectOrder();
    for (const order of incorrectData) {
        const check = adjustOrder(order, rules);
        midCount += check;
    }
    console.log(midCount);
};

solution2();
