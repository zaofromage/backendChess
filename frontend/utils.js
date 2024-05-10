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