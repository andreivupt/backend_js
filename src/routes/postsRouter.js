const {Router} = require('express');
const router = Router();
const upload = require('../config/multer');

const {
  salvarPost,
  listarPosts,
  selecionarIdPost,
  atualizarPost,
  deletarPost
} = require('../controllers/postsController')

router.post('/cadastrar/post', upload.single('imagem'), salvarPost);
router.get('/listar/posts', listarPosts);
router.get('/selecionar/post/:id', selecionarIdPost);
router.put('/atualizar/post/:id', upload.single('imagem'), atualizarPost);
router.delete('/deletar/post/:id', deletarPost);

module.exports = router;