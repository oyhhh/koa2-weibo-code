/**
 * @description user接口的路由
 */
const router = require('koa-router')()
const {isExist, register, login, changeInfo, changePassword, logout} = require('../../controller/user')
const userValidate = require('../../validator/user')
const {genValidator} = require('../../middlewares/validator')
const {loginCheck} = require('../../middlewares/loginCheck')
router.prefix('/api/user')
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const {userName, password, gender} = ctx.request.body
    ctx.body = await register({
        userName, password, gender
    })
})
router.post('/is-exist', async (ctx, next) => {
    const {userName} = ctx.request.body
    ctx.body = isExist(userName)
})

router.post('/login', async (ctx, next) => {
    const {userName, password} = ctx.request.body
    ctx.body = await login(ctx, userName.password)
})

router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const {nickName, city, password} = ctx.request.body
    ctx.body = await changeInfo(ctx, {nickName, city, password})
})

router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const {password, newPassword} = ctx.request.body
    const {userName} = ctx.session.userInfo
    ctx.body = await changePassword(userName, password, newPassword)
})

router.post('/logout', loginCheck, genValidator(userValidate), async (ctx, next) => {
    ctx.body = await logout(ctx)
})
module.exports = router