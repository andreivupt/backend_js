const express = require('express');
const cors    = require('cors');
const app     = express();
require('dotenv').config();

const userRouter  = require('./routes/usersRouter');
const loginRouter = require('./routes/loginRouter');
const postsRouter = require('./routes/postsRouter');
const comentariosRouter = require('./routes/comentariosRouter');

app.set('port', process.env.PORT);
app.use(cors());
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', loginRouter);
app.use('/api', postsRouter);
app.use('/api', comentariosRouter);

module.exports = app;
