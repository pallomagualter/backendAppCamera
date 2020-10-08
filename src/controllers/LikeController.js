const Post = require('../models/Post');

module.exports = {
    async store(req, res) {
       return res.json({ ok: true });
    }
};