const mmModel = require('../models/mmModel');
const userModel = require('../models/userModel');
const { getPostData, getParams } = require('../utils');


// @desc return all users in the matchmaking queue
// @route GET /matchmaking
const getMatchmaking = async (req, res) => {
    try {
        const mm = await mmModel.findAll();

        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(mm));
    } catch (error) {
        console.log(error);
    }
}

// @desc return one user from the matchmaking queue
// @route GET /matchmaking/[the name]
const getMatchmakingByName = async (req, res) => {
    try {
        const user = await mmModel.findByName(req.url.split('/')[2]);

        if (!user) {
            res.writeHead(404, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({message: 'User not found'}));
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify(user));
        }

    } catch (error) {
        console.log(error);
    }
}

// @desc add a user in the matchmaking queue by is nickname
// @route GET /enter-matchmaking?nickname=[nickname]
const enterMatchmaking = async (req, res) => {
    const nickname = getParams(req.url).get('nickname');
    try {
        const user = await userModel.findByName(nickname);
        if (!user) {
            res.writeHead(404, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({message: 'User not found'}));
        }
        else {
            await mmModel.addToMm(user);
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({message: `${nickname} has been added to the matchmaking queue`}));
        }
        
    } catch (error) {
        console.log(error);
    }
}

const getOutMatchmaking = async (req, res) => {
    try {
        const user = await userModel.findByName(getParams(req.url).get('nickname'));

        if (!user) {
            res.writeHead(404, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({message: 'User not found'}));
        }
        else {
            await mmModel.deleteByName(user.nickname);
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            return res.end(JSON.stringify({message : `${user.nickname} was successfully removed from the queue`}));
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getMatchmaking,
    getMatchmakingByName,
    enterMatchmaking,
    getOutMatchmaking
}