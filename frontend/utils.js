export const url = 'http://127.0.0.1:5500';
export const hostname = '127.0.0.1:5500';

export const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    let cookie = null;
    cookies.forEach(c => {
        if (c.startsWith(`${name}=`))
            cookie = c;
    });
    return cookie.split('=')[1];
} 

export const convertFEN = (exp) => {
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
