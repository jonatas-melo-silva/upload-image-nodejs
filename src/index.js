const express = require('express');
const cors = require('cors');

const app = express();

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  response.header(
    'Access-Control-Allow-Headers',
    'X-PINGOTHER, Content-Type, Authorization'
  );
  app.use(cors());
  return next();
});

const uploadImage = require('./middlewares/uploadImage');

app.post('/images', uploadImage.single('image'), async (request, response) => {
  try {
    if (request.file) {
      return response
        .status(200)
        .json({ error: false, message: 'Imagem salva com sucesso!' });
    } else {
      return response
        .status(400)
        .json({ error: true, message: 'Erro ao salvar imagem!' });
    }
  } catch (error) {
    return response.status(400).json({ error: true, message: error.message });
  }
});

app.listen(3333, () => {
  console.log('Servidor iniciado na porta 3333: http://localhost:3333');
});
