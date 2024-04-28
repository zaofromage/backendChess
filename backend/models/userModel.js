let users = require('../data/users');
const { writeDataToFile } = require('../utils');

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(users);
    })
}

const findByName = (nickname) => {
    return new Promise((resolve, reject) => {
        const user = users.find((u) => u.nickname === nickname);
        resolve(user);
    })
}

const create = (user) => {
    return new Promise((resolve, reject) => {
        users.push(user);
        writeDataToFile('./data/users.json', users);
        resolve(user);
    })
}

const update = (nickname, user) => {
    return new Promise(async (resolve, reject) => {
        const index = users.findIndex((u) => u.nickname === nickname);
        users[index] = {...user};
        writeDataToFile('./data/users.json', users);
        resolve(users[index]);
    })
}

const deleteByName = (nickname) => {
    return new Promise(async (resolve, reject) => {
        users = users.filter((u) => u.nickname !== nickname);
        writeDataToFile('./data/users.json', users);
        resolve();
    })
}

module.exports = {
    findAll,
    findByName,
    create,
    update,
    deleteByName
}