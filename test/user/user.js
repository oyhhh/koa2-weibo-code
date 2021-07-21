/**
 * @description user api test  单元测试
 */

const server = require('../server')

const userName = `u_${Date.now()}`,
    password = `p_${Date.now()}`,
    testUser = {
        userName,
        password,
        nickName: userName,
        gender: 1
    }

let COOKIE = ''

test('注册用户', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).toBe(0)
})

test('重复注册', async () => {
    const res = await server
        .post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).not.toBe(0)
})

test('查询用户', async () => {
    const res = await server
        .post('/api/user/is-exist')
        .send({userName})
    expect(res.body.errno).toBe(0)
})

test('json schema检测,非法的格式', async () => {
    const res = await server
        .post('/api/user/register')
        .send({
            userName: '123',
            password: '1',
            gender: 'mail'
        })
    expect(res.body.errno).not().toBe(0)
})

test('登录', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName,
            password
        })
    expect(res.body.errno).toBe(0)
    COOKIE = res.headers['set-cookie'].join(';')
})

test('修改信息', async () => {
    const res = await server
        .patch('/api/user/changeInfo')
        .send({
            nickName: '测试',
            city: 'gege',
            picture: '/test.png'
        })
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// 修改密码
test('修改密码应该成功', async () => {
    const res = await server
        .patch('/api/user/changePassword')
        .send({
            password,
            newPassword: `p_${Date.now()}`
        })
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// 删除
test('删除用户，应该成功', async () => {
    const res = await server
        .post('/api/user/delete')
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// 退出
test('退出登录应该成功', async () => {
    const res = await server
        .post('/api/user/logout')
        .set('cookie', COOKIE)
    expect(res.body.errno).toBe(0)
})

// 再次查询用户，应该不存在
test('删除之后，再次查询注册的用户名，应该不存在', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send({userName})
    expect(res.body.errno).not.toBe(0)
})
