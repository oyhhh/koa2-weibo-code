const {User} = require('../db/model/user')
const {formatUser} = require('./_format')

async function getUserInfo(userName, password) {
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, password)
    }
    const result = await User.findOne({
        attributes: ['id', 'userName', 'password', 'picture', 'city'],
        where: whereOpt
    })

    if (!result) {
        return result
    }

    return formatUser(result.dataValues)
}

module.exports = {
    getUserInfo
}