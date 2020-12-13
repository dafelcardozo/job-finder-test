var url = require('url');

export default async function handler(req, res) {
    try {
        const profile = url.parse(req.url, true).query.profile;
        const result = await fetch(`https://torre.bio/api/bios/${profile}`);
        res.status(result.status);
        const json = await result.json();
        res.json(json)
    } catch(ex) {
        console.info(ex);
    }
}