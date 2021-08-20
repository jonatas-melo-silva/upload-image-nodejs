const multer = require('multer');

module.exports = multer({
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, 'tmp/images/users');
    },
    filename: (request, file, callback) => {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (request, file, callback) => {
    const extensionImg = ['image/png', 'image/jpg', 'image/jpeg'].find(
      (acceptedFormat) => acceptedFormat === file.mimetype
    );
    if (extensionImg) {
      return callback(null, true);
    } else {
      return callback(
        null,
        new Error(
          'Formato de imagem inválido, envie apenas imagens .png, .jpg ou .jpeg!'
        )
      );
    }
  },
});
