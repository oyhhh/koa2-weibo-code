const router = require('koa-router')()
const {loginCheck} = require('../../middlewares/loginCheck')
const {getBlogListStr} = require('../../utils/blog')
router.prefix('/api/atMe')
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let {pageIndex} = ctx.params
    pageIndex = parseInt(pageIndex)
    const {id: userId} = ctx.session.userInfo
    const result = await getAtMeBlogList(userId, pageIndex)
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router