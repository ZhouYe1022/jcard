const Koa = require('koa');
const getRouter = require('./router.js');

async function startServer() {
  const db = require('sqlite');
  await db.open('database.sqlite');
  const app = new Koa();
  const router = getRouter(db);
  app.use(require('koa-bodyparser')());
  app.use(router.routes());
  app.use(router.allowedMethods());
  //app.use(require('koa-static')('html'));

  app.listen(3000);

  console.log('listening on port 3000');
}
startServer();
