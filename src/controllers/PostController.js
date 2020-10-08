const Post = require('../models/Post');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt'); //este menos no começo de createdAt é para ordenar pela criação ou seja ordem decrescente 

        return res.json(posts);
    }, 

    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;
        //console.log(req.body);

        const post = await Post.create({
            author,
            place,
            description, 
            hashtags,
            image,
        });

        return res.json(post);
        
       //return res.json({ ok: true });
    }
};

