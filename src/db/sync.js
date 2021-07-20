const seq = require('./seq')

require('./model/index')
seq.authenticate().then(() => {
    console.log('success')
}).catch(() => {
    console.log('error')
})

seq.sync({force: true}).then(() => {
    console.log('sync ok')
    process.exit()
})
