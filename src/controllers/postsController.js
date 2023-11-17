const connection = require('../config/db');

async function salvarPost(request, response) {
  const query = "INSERT INTO posts(descricao, imagem, titulo, id_usuario) values(?,?,?,?)";

  const params = Array(
    request.body.descricao,
    request.file.filename,
    request.body.titulo,
    request.body.id_usuario
  );

  connection.query(query, params, (err, results) => {
    if (results) {
      response
        .status(200)
        .json({
          success: true,
          message: "Sucesso!",
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
  })
}

async function listarPosts(request, response) {
  const query = "SELECT * FROM posts";

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

async function selecionarIdPost(request, response) {
  const query = "SELECT * FROM posts WHERE id = ?;";

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

async function atualizarPost(request, response) {
  const query = "UPDATE posts " +
  " SET descricao = ?, imagem = ?, titulo = ?, id_usuario = ? " +
  " WHERE id = ?;";

  const params = Array(
    request.body.descricao,
    request.file ? request.file.filename : null,
    request.body.titulo,
    request.body.id_usuario,
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

async function deletarPost(request, response) {
  const query = "DELETE FROM posts WHERE id = ?;";

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
  salvarPost,
  listarPosts,
  selecionarIdPost,
  atualizarPost,
  deletarPost
}