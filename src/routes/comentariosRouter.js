const {Router} = require('express');
const router = Router();
const upload = require('../config/multer');

const {
  salvarComentario,
  listarComentariosPost,
  listarComentariosUsuario,
  atualizarComentario,
  deletarComentario
} = require('../controllers/comentariosController')

router.post('/cadastrar/comentario', upload.single('imagem'), salvarComentario);
router.get('/pesquisar/comentarios/post', listarComentariosPost);
router.get('/pesquisar/comentarios/usuario', listarComentariosUsuario);
router.put('/atualizar/comentario/:id', upload.single('imagem'), atualizarComentario);
router.delete('/deletar/comentario/:id', deletarComentario);

module.exports = router;