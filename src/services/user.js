const {User} = require('../db/model/index')
const {formatUser} = require('./_format')

async function getUserInfo(userName, password) {
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, password)
    }
    const result = await User.findOne({
        attributes: ['id', 'user_name', 'password', 'picture', 'city'],
        where: whereOpt
    })

    if (result == null) {
        return result
    }

    return formatUser(result.dataValues)
}

async function createUser({userName, password, gender = 0, nickName}) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    const data = result.dataValues
    return data
}

module.exports = {
    getUserInfo,
    createUser
}