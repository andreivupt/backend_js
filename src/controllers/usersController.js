const connection = require('../config/db');

async function salvarUsuario(request, response) {
  const query = 'INSERT INTO usuarios(nome, email, senha, usuario, perfil, sexo, dt_nascimento, imagem) values(?,?,?,?,?,?,?,?);';

  const params = Array(
    request.body.nome,
    request.body.email,
    request.body.senha,
    request.body.usuario,
    request.body.perfil,
    request.body.sexo,
    request.body.dt_nascimento,
    request.file.filename
  );

  connection.query(query, params, (err, results) => {
    try {
      if (results) {
        response
          .status(200)
          .json({
            success: true,
            message: 'Sucesso!',
            data: results
          })
      } else {
        response
          .status(400)
          .json({
            success: false,
            message: 'Não deu sucesso!',
            query: err.sql,
            sqlMessage: err.sqlMessage
          })
      }
    } catch (error) {
      response
        .status(500)
        .json({
          success: false,
          message: 'Não deu sucesso! ',
          data: error
        })
    }
  });
};

async function listarUsuarios(request, response) {
  const query = "SELECT * FROM usuarios";

  connection.query(query, (err, results) => {
    if (results) {
      response
        .status(200)
        .json({
          success: true,
          message: "Sucesso!",
          data: results
        });
    } else {
      response
        .status(400)
        .json({
          success: false,
          message: "Deu erro!",
          query: err.sql,
          sqlMessage: err.sqlMessage
        });
    }
  })
}

async function selecionarIdUsuario(request, response) {
  const query = "SELECT * FROM usuarios WHERE id = ?;";

  const params = Array(
    request.params.id
  );

  connection.query(query, params, (err, results) => {
    if (results) {
      response
        .status(200)
        .json({
          success: true,
          message: 'Sucesso!',
          data: results
        });
    } else {
      response
        .status(400)
        .json({
          success: false,
          message: 'Não deu sucesso!',
          query: err.sql,
          sqlMessage: err.sqlMessage
        });
    }
  })
}

async function pesquisarNomeUsuario(request, response) {
  const query = "SELECT * FROM usuarios WHERE nome LIKE ?;";

  const params = Array(
    request.params.nome
  );

  connection.query(query, `%${params}%`, (err, results) => {
    if (results) {
      response
        .status(200)
        .json({
          success: true,
          message: 'Sucesso!',
          data: results
        });
    } else {
      response
        .status(400)
        .json({
          success: false,
          message: 'Não deu sucesso!',
          query: err.sql,
          sqlMessage: err.sqlMessage
        });
    }
  })
}

async function atualizarUsuario(request, response) {
  const query = "UPDATE usuarios " +
  " SET nome = ?, email = ?, senha = ?, usuario = ?, perfil = ?, sexo = ?, dt_nascimento = ?, imagem = ? " +
  " WHERE id = ?;";

  const params = Array(
    request.body.nome,
    request.body.email,
    request.body.senha,
    request.body.usuario,
    request.body.perfil,
    request.body.sexo,
    request.body.dt_nascimento,
    request.file ? request.file.filename : null,
    request.params.id
  );

  connection.query(query, params, (err, results) => {
    if (results) {
      response
        .status(200)
        .json({
          success: true,
          message: 'Sucesso!',
          data: results
        });
    } else {
      response
        .status(400)
        .json({
          success: false,
          message: 'Não deu sucesso!',
          query: err.sql,
          sqlMessage: err.sqlMessage
        });
    }
  })
}

async function deletarUsuario(request, response) {
  const query = "DELETE FROM usuarios WHERE id = ?;";

  const params = Array(
    request.params.id
  );

  connection.query(query, params, (err, results) => {
    if (results) {
      response
        .status(200)
        .json({
          success: true,
          message: 'Sucesso!',
          data: results
        });
    } else {
      response
        .status(400)
        .json({
          success: false,
          message: 'Não deu sucesso!',
          query: err.sql,
          sqlMessage: err.sqlMessage
        });
    }
  })
}

module.exports = {
  salvarUsuario,
  listarUsuarios,
  selecionarIdUsuario,
  pesquisarNomeUsuario,
  atualizarUsuario,
  deletarUsuario
}