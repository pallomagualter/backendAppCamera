const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt'); //este menos no começo de createdAt é para ordenar pela criação ou seja ordem decrescente 

        return res.json(posts);
    }, 
    
        async store(req, res) {
            const { author, place, description, hashtags } = req.body
            const { filename: image } = req.file
            const [name] = image.split('.')
            const fileName = `${name}.jpg` //garantir que seja armazenada como jpg
            
            await sharp(req.file.path) //redimensionamento da imagem
               .resize(500) //definir 500pixel para imagem
               .jpeg({ quality: 70 }) //definindo o tipo como jpeg e a qualidade 70%
               .toFile( //caminho para imagem pos redimensionamento
                  path.resolve(req.file.destination, 'resized', fileName)
               )
            fs.unlinkSync(req.file.path); //para deletar a imagem no tamanho normal da pasta upload após o remensionamento e armazenamento na pasta resized

        const post = await Post.create({
            author,
            place,
            description, 
            hashtags,
            image: fileName,
        });

        req.io.emit('post', post); //irá emitir uma messagem para todas conectados em tempo real assim que salvar no banco que é o nosso post

        return res.json(post);
        
       //return res.json({ ok: true });
    }
};

