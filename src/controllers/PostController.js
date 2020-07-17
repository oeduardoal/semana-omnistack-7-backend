const { Post } = require('../models');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res){
        const posts = await Post.find().sort('-createdAt')
        return res.json(posts);
    },
    async store(req, res){
        const { author, places, description, hashtags } = req.body;
        const { filename: image } = req.file;
        const [name] = image.split('.');
        const fileName = `${name}.jpg`;
        await sharp(req.file.path)
             .resize(500)
             .jpeg({ quality: 70 })
             .toFile(
                 path.resolve(req.file.destination, 'resized', fileName)
             )

        fs.unlinkSync(req.file.path);
    
        const post = await Post.create({
            author, places, description, hashtags, image: fileName
        })
        req.io.emit('post', post);
        res.json(post);
    }
}