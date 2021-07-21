const router = require('koa-router')()
const {loginCheckFailInfo} = require('../middlewares/loginCheck')

router.get('/',loginCheckFailInfo, async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    const session = ctx.session
    if (!session.keyValue) {
        session.keyValue = 0
    }
    session.keyValue++

    ctx.body = {
        title: 'koa2 json'
    }
})

module.exports = router
