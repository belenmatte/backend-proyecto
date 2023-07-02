const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const router = require('./routes');
const orm = require('./models');

const app = new Koa();

app.context.orm = orm;

app.use(cors({
  origin: 'http://localhost:3001', // Reemplaza con la URL y el puerto correctos del frontend
  credentials: true // Si estás enviando solicitudes con credenciales (cookies, encabezados de autenticación, etc.)
}));
app.use(KoaLogger());
app.use(koaBody());

app.use(router.routes());

app.use((ctx) => {
  ctx.body = 'Hola Mundo!';
});

module.exports = app;
