export default function canonize(url) {
    // const re = new RegExp('@?(https?:)?(\/\/)?((vk|twitter|telegram)[^\/]*\/)?([a-zA-Z0-9]*)', 'i');
    if (url) {
        // const re = new RegExp('@?(https?:)?(\/\/)?((@?a-zA-Z0-9.)[^\/]*\/)?([a-zA-Z0-9.]*)', 'i');
        const re = new RegExp('@?(https?:)?(\/\/)?(([@?a-zA-Z0-9._]*)[^\/]*\/)?([@?a-zA-Z0-9._a]*)', 'i');
        const username = url.match(re)[5];
        return username[0] != '@' ? '@' + username : username;
    }
    return 'Username undefined'
};