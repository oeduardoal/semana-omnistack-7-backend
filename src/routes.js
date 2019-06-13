const express = require('express');
const multer = require('multer');
const routes = new express.Router();
const { uploadConfigs } = require('./config');

const { PostController, LikeController } = require('./controllers/');

const upload = multer(uploadConfigs);

routes.get('/posts', PostController.index)
routes.post('/posts', upload.single('image'), PostController.store)
routes.post('/posts/:id/like', LikeController.store)
module.exports = routes;