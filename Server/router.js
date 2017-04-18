  function _pick(obj, keys) {
    const ret = {};
    keys.forEach((k) => {
      ret['$' + k] = obj[k]
    });
    return ret;
  }

  function getRouter(db) {
    const router = require('koa-router')({
      prefix: '/api'
    });
    router
      .get('/lost', async(ctx) => {
        if (ctx.query.OwnerName && ctx.query.CardNumber) {
          const query = _pick(ctx.query, ['OwnerName', 'CardNumber', 'Status']);
          if (!query.$Status) {
            query.$Status = 0;
          }
          ctx.body = {
            result: await db.all('SELECT * FROM Card_Lost WHERE OwnerName = $OwnerName AND CardNumber = $CardNumber AND Status = $Status', query)
          };
        } else {
          ctx.body = { result: [], error: 'Arguments Missing' };
          //ctx.body = { result: await db.all('SELECT * FROM Card_Lost') };
        }
      })
      .get('/found', async(ctx) => {
        if (ctx.query.OwnerName && ctx.query.CardNumber) {
          const query = _pick(ctx.query, ['OwnerName', 'CardNumber', 'Status']);
          if (!query.$Status) {
            query.$Status = 0;
          }
          ctx.body = {
            result: await db.all('SELECT * FROM Card_Found WHERE OwnerName = $OwnerName AND CardNumber = $CardNumber AND Status = $Status', query)
          };
        } else {
          ctx.body = { result: [], error: 'Arguments Missing' };
          //ctx.body = { result: await db.all('SELECT * FROM Card_Found') };
        }
      })
      .post('/lost', async(ctx) => {
        const isExist = await db.get('SELECT * FROM Card_Lost WHERE OwnerName = $OwnerName AND CardNumber = $CardNumber AND Status = 0',
          _pick(ctx.request.body, ['OwnerName', 'CardNumber']));
        if (isExist) {
          ctx.body = '记录已存在，当前卡片已登记为丢失状态';
          ctx.status = 400;
        } else {
          await db.run('INSERT INTO Card_Lost (OwnerName,CardNumber,Message) VALUES ($OwnerName,$CardNumber,$Message)',
            _pick(ctx.request.body, ['OwnerName', 'CardNumber', 'Message']))
          ctx.body = {
            result: true
          }
        }
      })
      .post('/found', async(ctx) => {
        const isExist = await db.get('SELECT * FROM Card_Found WHERE OwnerName = $OwnerName AND CardNumber = $CardNumber AND Status = 0',
          _pick(ctx.request.body, ['OwnerName', 'CardNumber']));
        if (isExist) {
          ctx.body = '记录已存在，当前卡片已登记为待认领状态';
          ctx.status = 400;
        } else {
          await db.run('INSERT INTO Card_Found (OwnerName,CardNumber,Message,FounderName) VALUES ($OwnerName,$CardNumber,$Message,$FounderName)',
            _pick(ctx.request.body, ['OwnerName', 'CardNumber', 'Message', 'FounderName']))
          ctx.body = {
            result: true
          }
        }
      })
      .get('/lost/:id', async(ctx) => {
        //ctx.body = { result: await db.get('SELECT * FROM Card_Lost WHERE id = ?', ctx.params.id) }
        ctx.body = { result: [] };
      })
      .get('/found/:id', async(ctx) => {
        //ctx.body = { result: await db.get('SELECT * FROM Card_Found WHERE id = ?', ctx.params.id) }
        ctx.body = { result: [] };
      })
      .put('/lost/:id', async(ctx) => {
        const res = await db.run('UPDATE Card_Lost SET Status = $Status WHERE id = $id AND CardNumber = $CardNumber', {
          $Status: Number(ctx.request.body.Status),
          $id: ctx.params.id,
          $CardNumber: ctx.request.body.CardNumber
        });
        ctx.body = {
          result: res.stmt.changes
        };
      })
      .put('/found/:id', async(ctx) => {
        const res = await db.run('UPDATE Card_Found SET Status = $Status WHERE id = $id AND CardNumber = $CardNumber', {
          $Status: Number(ctx.request.body.Status),
          $id: ctx.params.id,
          $CardNumber: ctx.request.body.CardNumber
        });
        ctx.body = {
          result: res.stmt.changes
        };
      })
      .post('/advice', async(ctx) => {
        await db.run('INSERT INTO Advice (Email,Message) VALUES ($Email,$Message)',
          _pick(ctx.request.body, ['Message', 'Email']))
        ctx.body = {
          result: true
        }
      })
      .get('/usageCount', async(ctx) => {
        ctx.body = {
          result: {
            FoundResolvedCount: (await db.get('SELECT Count(id) FROM Card_Found WHERE Status = 1'))['Count(id)'],
            LostResolvedCount: (await db.get('SELECT Count(id) FROM Card_Lost WHERE Status = 1'))['Count(id)'],
            FoundPendingCount: (await db.get('SELECT Count(id) FROM Card_Found WHERE Status = 0'))['Count(id)'],
            LostPendingCount: (await db.get('SELECT Count(id) FROM Card_Lost WHERE Status = 0'))['Count(id)']
          }
        }
      });
    return router;
  }

  module.exports = getRouter;
