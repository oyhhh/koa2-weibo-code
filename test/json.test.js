const server = require('./server')

test('json',async ()=>{
    const res = await server.get('/json')
    expect(res.body).toEqual({
        title:'koa title'
    })
})