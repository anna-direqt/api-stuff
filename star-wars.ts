import * as readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getData(type : string, num : number) {
    type = type.toLowerCase();
    return fetch(`https://swapi.dev/api/${type}/${num}/`);
}

async function getCategory() : Promise<string> {
    const answer = await rl.question('Enter category (people, planets, starships, etc.) ', {
        signal: AbortSignal.timeout(20_000) // 20s timeout
    });
    return answer;
}

async function getNumber() : Promise<string> {
    const answer = await rl.question('Enter number: ', {
        signal: AbortSignal.timeout(10_000) // 10s timeout
    });
    return answer;
}

async function main() {
    try {
        var category = await getCategory();
        var num = await getNumber();
        rl.close();
        var response = await getData(category, parseInt(num));
        response = await response.json();
        console.log(response);
    }
    catch (error) {
        console.log(error);
    }
}

main();