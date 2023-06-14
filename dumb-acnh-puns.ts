function getNumber(category : String) : number {
    var max = 0;
    switch (category) {
        case "fish":
            max = 80;
            break;
        case "sea":
            max = 40;
            break;
        case "bugs":
            max = 80;
            break;
        default:
            break;
    }
    const num = Math.floor(Math.random() * max);
    return num;
}

function getCategory() : string {
    const num = Math.floor(Math.random() * 3);
    switch (num) {
        case 0:
            return "fish";
        case 1:
            return "sea";
        case 2:
            return "bugs";
        default:
            return ":(";
    }
}

async function getData(category: string, num: number) {
    var data = await fetch(`https://acnhapi.com/v1/${category}/${num}`);
    data = await data.json();
    return data;
}

async function punAndInfo() {
    const category = getCategory();
    const num = getNumber(category);
    const data = await getData(category, num);
    console.log(`Creature: ${data['file-name']}`);
    console.log(`Stupid blurb: ${data['catch-phrase']}`);
    console.log(`Blathers says: ${data['museum-phrase']}`);
}

punAndInfo();