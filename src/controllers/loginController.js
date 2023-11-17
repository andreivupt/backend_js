// importa as configurações do banco
const connection = require('../config/db');
// importa o pacote para gerar token
const jwt = require('jsonwebtoken');

async function login(request, response) {
  // constrói a consulta no banco
  const query = 'SELECT * FROM usuarios WHERE email = ?;';

  // recupera o e-mail enviado do formulário
  const params = Array(
    request.body.email
  );

  // executa a consulta no banco pelo e-mail recebido
  connection.query(query, params, (err, results) => {
    // varifica se existe usuario com o email recebido    
    if (results) {
      // recupera os dados do usuario
      const dadosUsuario = results[0];
      // valida senha recebido do formulário e a existente no banco
      if (dadosUsuario.senha === request.body.senha) {        
        const id = dadosUsuario.id;
        
        // criando token de acesso a aplicação
        const token = jwt.sign(
          { id },   // payload: informações como o identificador do usuário
          'token',      // chave secreta: A ideia é que só você saiba a sua chave secreta e que ela seja difícil a fim de dificultar a ação de ataques maliciosos
          { expiresIn: '1h' } // opcionais
        );
        
        response
          .status(200)
          .json({
            success: true,
            message: 'Sucesso!',
            data: dadosUsuario,
            token: token
          })
      }
    }
  })
}

module.exports = {
  login
};