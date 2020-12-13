const url = require('url');
import axios from 'axios'

export default async function handler(req, res) {
    try {
        const search = url.parse(req.url, true).search;
        const result = await axios.post(`https://search.torre.co/opportunities/_search/${search}`, req.body);
        res.status(result.status);
        const json = await result.data;
        res.json(json)
    } catch(ex) {
        console.info(ex);
    }
}

