const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            
            const extension = path.extname(file.originalname); 
            const name = path.basename(file.originalname, extension);

            cb(null, `${name}-${Date.now()}${extension}`); //para garantir que a imagem seja única usamos o Date.now
        }
    })
};