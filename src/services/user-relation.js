const {User, UserRelation} = require('../db/model/index')
const {formatUser} = require('./_format')
const Sequelize = require('requelize')

async function getUsersByFollower(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId,
                    userId: {
                        //除了自己
                        [Sequelize.Op.ne]: followerId
                    }
                }
            }
        ]
    })

    let userList = result.rows.map(row => row.dataVaules)
    userList = formatUser(userList)

    return {
        count: result.count,
        userList
    }
}

async function getFollowersByUser(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [{
            model: User,
            attributes: ['id', 'userName', 'nickName', 'picture']
        }],
        where: {
            userId,
            followerId: {[Sequelize.Op.ne]: userId}
        }
    })

    let userList = result.rows.map(row => row.dataValues)
    userList = userList.map(item => {
        let user = item.user
        user = user.dataValues
        user = formatUser(user)
        return user
    })
    return {
        count: result.count,
        userList
    }
}

async function addFollower(userId, followerId) {
    const result = await UserRelation.create({
        userId,
        followerId
    })
    return result.dataValues
}

async function deleteFollower(userId, followerId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })
    return result > 0
}

module.exports = {
    getFollowersByUser,
    getUsersByFollower,
    deleteFollower,
    addFollower
}