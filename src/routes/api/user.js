const router = require('koa-router')()
const {isExist} = require('../../controller/user')
router.prefix('/api/user')
router.post('/register', async (ctx, next) => {

})
router.post('/is-exist', async (ctx, next) => {
    const {userName} = ctx.request.body
    ctx.body = isExist(userName)
})
module.exports = router