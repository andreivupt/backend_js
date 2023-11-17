const {Router} = require('express');
const router = Router();

const {
  login
} = require('../controllers/loginController')

router.post('/logar', login);

module.exports = router;