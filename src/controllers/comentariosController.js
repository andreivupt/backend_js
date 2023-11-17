const connection = require('../config/db');

async function salvarComentario(request, response) {
  const query = "INSERT INTO comentarios(descricao, imagem, id_post, id_usuario) values(?,?,?,?)";

  const params = Array(
    request.body.descricao,
    request.file.filename,
    request.body.id_post,
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

async function listarComentariosPost(request, response) {
  const query = "SELECT c.* " +
  " FROM comentarios c, posts p " +
  " WHERE c.id_post = p.id AND p.id = ?;";

  const params = Array(
    request.body.id_post
  );

  connection.query(query, params, (err, results) => {
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

async function listarComentariosUsuario(request, response) {
  const query = "SELECT c.* " +
  " FROM comentarios c, usuarios u " +
  " WHERE c.id_usuario = u.id AND u.id = ?;";

  const params = Array(
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
        });
    } else {
      response
        .status(400)
        .json({
          success: true,
          message: "Deu erro!",
          query: err.sql,
          sqlMessage: err.sqlMessage
        });
    }
  })
}

async function atualizarComentario(request, response) {
  const query = "UPDATE comentarios " +
  " SET descricao = ?, imagem = ?, id_post = ?, id_usuario = ? " +
  " WHERE id = ?;";

  const params = Array(
    request.body.descricao,
    request.file ? request.file.filename : null,
    request.body.id_post,
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

async function deletarComentario(request, response) {
  const query = "DELETE FROM comentarios WHERE id = ?;";

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
  salvarComentario,
  listarComentariosPost,
  listarComentariosUsuario,
  atualizarComentario,
  deletarComentario
}