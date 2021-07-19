const {isProd} = require('../utils/env')
let REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
}

let MYSQL_CONF = {
    host: '8.141.54.113',
    dialect: 'mysql',
    user: 'xxy',
    password: '_X_X,y/1',
    database: 'weibo'
}

if (isProd) {
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
    MYSQL_CONF = {
        host: '8.141.54.113',
        dialect: 'mysql',
        user: 'xxy',
        password: '_X_X,y/1',
        database: 'weibo'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}