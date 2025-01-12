import { categories } from "../resources/labels";

const sortType = (a, b) => {
    if (categories[a.type].type < categories[b.type].type) { return -1; }
    if (categories[a.type].type > categories[b.type].type) { return 1; }
    return 0;
}
const sortDate = (a, b) => {
    if (a.date < b.date) { return -1; }
    if (a.date > b.date) { return 1; }
    return 0;
}
const sortName = (a, b) => {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }
    return 0;
}
const sortAmount = (a, b) => {
    if (a.amount < b.amount) { return -1; }
    if (a.amount > b.amount) { return 1; }
    return 0;
}


const SortAscending = (data) => {
    const { type, headers, transactions } = data;
    const sortFunctions = [sortType, sortDate, sortName, sortAmount];

    for (let [index, header] of headers.entries()) {
        if (header === type) {
            return transactions.sort(sortFunctions[index]);
        }
    }
}

export default SortAscending;