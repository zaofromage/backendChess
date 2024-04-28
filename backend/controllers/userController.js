const userModel = require('../models/userModel');
const { getPostData } = require('../utils');

// @desc Get all users
// @route GET /users
const getUsers = async (req, res) => {
    try {
        const users = await userModel.findAll();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
}

// @desc Get a user from his name
// @route GET /users/[the name]
const getUserByName = async (req, res) => {
    try {
        const user = await userModel.findByName(req.url.split('/')[2]);

        if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'User not found'}));
        }
        else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
        }

    } catch (error) {
        console.log(error);
    }
}

// @desc create a new user
// @route POST /users
const createUser = async (req, res) => {
    try {
        const body = await getPostData(req);

        const { nickname, password, elo } = JSON.parse(body);

        const isPresent = await userModel.findByName(nickname);

        if (!isPresent){
            const user = {
                nickname,
                password,
                elo
            }    
    
            const newUser = await userModel.create(user);
    
            res.writeHead(201, { 'Content-Type' : 'application/json' });
            return res.end(JSON.stringify(newUser));
        }
        else {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({message: "This nickname is already taken"}));
        }

    } catch (error) {
        console.log(error);
    }
}

// @desc Update user's data from his name
// @route PUT /users/[the name]
const updateUser = async (req, res) => {
    try {
        const userNickname = req.url.split('/')[2];
        const user = await userModel.findByName(userNickname);

        if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'User not found'}));
        }
        else {
            const body = await getPostData(req);

            const { nickname, password, elo } = JSON.parse(body);

            const userData = {
                nickname: nickname || user.nickname,
                password: password || user.password,
                elo: elo || user.elo
            }    

            const updUser = await userModel.update(userNickname, userData);

            res.writeHead(200, { 'Content-Type' : 'application/json' });
            return res.end(JSON.stringify(updUser));
        }
        

    } catch (error) {
        console.log(error);
    }
}

// @desc Get a user from his name
// @route GET /users/[the name]
const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByName(req.url.split('/')[2]);

        if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'User not found'}));
        }
        else {
            await userModel.deleteByName(user.nickname);
            res.writeHead(200, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({message : `${user.nickname} has successfully been removed`}));
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers,
    getUserByName,
    createUser,
    updateUser,
    deleteUser
}