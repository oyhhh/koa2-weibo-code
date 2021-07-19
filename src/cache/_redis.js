const redis = require('redis')
const {REDIS_CONF} = require('./../conf/db')
const {host, port} = REDIS_CONF
const redisClient = redis.createClient(port, host)
redisClient.on('error', err => {
    console.log('redis err', err)
})

function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                resolve(JSON.parse(val))
            } catch (ex) {
                resolve(ex)
            }
        })
    })
    return redisClient.get(key)
}

module.exports = {
    set,
    get
}