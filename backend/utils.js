const fs = require('fs');

const writeDataToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    })
}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk.toString();
            })
            req.on('end', () => {
                resolve(body);
            })

        } catch (error) {
            reject(error);
        }
    })
}

const convertFEN = (exp) => {
    let board = [];
    exp.split('/').map((line) => {
        let raw = [];
        line.split('').map((c) => {
            if (c >= '1' && c <= '8') {
                for (let i = 0; i < parseInt(c, 10); i++){
                    raw.push("");
                }
            } else {
                raw.push(c);
            }
        });
        board.push(raw);
    })
    return board;
}

const getParams = (url) => {
    const params = url.split('?')[1];
    let paramList = new Map();
    params.split('&').map((p) => {
        const param = p.split('=');
        paramList.set(param[0], param[1]);
    });
    return paramList;
}

module.exports = {
    writeDataToFile,
    getPostData,
    convertFEN,
    getParams
}