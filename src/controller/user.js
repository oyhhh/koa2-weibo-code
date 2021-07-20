const {getUserInfo,createUser} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo, registerFailInfo, registerUserNameExistInfo} = require('../model/ErrorInfo')

/**
 *
 * @param userName
 * @returns {Promise<*>}
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

async function register({userName, password, gender}) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new ErrorModel(registerUserNameExistInfo)
    }

    try {
        await createUser({
            userName,
            passwrod,
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

module.exports = {
    isExist,
    register
}