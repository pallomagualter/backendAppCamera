const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const PostController = require('./controllers/PostController');

const routes = express.Router();
const upload = multer(uploadConfig);


routes.post('/posts', upload.single('image'), PostController.store);

module.exports = routes;