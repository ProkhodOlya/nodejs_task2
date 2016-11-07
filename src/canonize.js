export default function canonize(url) {
    // const re = new RegExp('@?(https?:)?(\/\/)?((vk|twitter|telegram)[^\/]*\/)?([a-zA-Z0-9]*)', 'i');
    const re = new RegExp('@?(https?:)?(\/\/)?((telegram|vk|twitter)[^\/]*\/)?([a-zA-Z0-9.]*)', 'i');
    const username = url.match(re)[5];
    return '@' + username;
};