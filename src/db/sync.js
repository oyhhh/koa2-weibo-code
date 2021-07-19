const seq = require('./seq')
seq.authenticate().then(() => {
    console.log('success')
}).catch(() => {
    console.log('error')
})

seq.sync().then(() => {
    console.log('sync ok')
    process.exit()
})
