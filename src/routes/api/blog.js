const router = require('koa-router')()
const {loginCheck} = require('../../middlewares/loginCheck')
const {create} = require('../../controller/blog')
const {genValidator} = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const {content, image} = ctx.request.body
    const {id: userId} = ctx.session.userInfo
    ctx.body = await create({userId, content, image})
})

router.get('/loadMore/:pageIndex',loginCheck,async (ctx,next)=>{
    let {pageIndex} = ctx.params
    pageIndex = parseInt(pageIndex)
    const {id:userId}= ctx.session.userInfo
    const result = await  getHomeBlogList(userId,pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})
module.exports = router