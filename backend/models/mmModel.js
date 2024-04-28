let mm = require('../data/matchmaking');
const { writeDataToFile } = require('../utils');

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(mm);
    })
}

const findByName = (nickname) => {
    return new Promise((resolve, reject) => {
        const user = mm.find((u) => u.nickname === nickname);
        resolve(user);
    })
}

const addToMm = (user) => {
    return new Promise((resolve, reject) => {
        mm.push(user);
        writeDataToFile('./data/matchmaking.json', mm);
        resolve();
    })
}

const deleteByName = (nickname) => {
    return new Promise(async (resolve, reject) => {
        mm = mm.filter((u) => u.nickname !== nickname);
        writeDataToFile('./data/matchmaking.json', mm);
        resolve();
    })
}

module.exports = {
    findAll,
    findByName,
    addToMm,
    deleteByName
}