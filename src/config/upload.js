const path = require('path');
const multer = require('multer');
var date = new Date();
var timestamp = date.getTime();

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, cb){
            cb(null, file.originalname)
        }
    }),
}