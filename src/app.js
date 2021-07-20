const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const {REDIS_CONF} = require('./conf/db')
const redisStore = require('koa-redis')
const index = require('./routes')
// const users = require('./routes/users')
const users = require('./routes/view/user')
const userApi = require('./routes/api/user')
const errorViewRoute = require('./routes/view/error')
const {isProd} = require('./utils/env')

let errorConf = {}
if (isProd) {
    errorConf = {
        redirect: '/error'
    }
}
// error handler
onerror(app, errorConf)


// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

app.keys = ['UIDSDdds_323231']
app.use(session({
    key: 'weibo.sid',//cookie name
    prefix: 'weibo.sess',//reids key 的前缀
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 //ms
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))


// logger
// app.use(async (ctx, next) => {
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(userApi.routes(), userApi.allowedMethods())
app.use(errorViewRoute.routes(), errorViewRoute.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
