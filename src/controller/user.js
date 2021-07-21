/**
 * @description 除了接口中的逻辑,调用services层(表中)的数据
 */
const {getUserInfo, createUser, updateUser} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerFailInfo,
    registerUserNameExistInfo,
    loginFailInfo,
    changeInfoFailInfo,
    changePasswordFileInfo
} = require('../model/ErrorInfo')
const {doCrypto} = require('../utils/cryp')

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
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    } catch (ex) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, password)
    if (!userInfo) {
        return new ErrorModel(loginFailInfo)
    }
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

async function changeInfo(ctx, {nickName, city, picture}) {
    const {userName} = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }
    const result = await updateUser({
        newNickName: nickName,
        newCity: city,
        newPicture: picture
    }, {
        userName
    })
    if (result) {
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}

async function changePassword(userName, password, newPassword) {
    const result = await updateUser({
        newPassword: doCrypto(newPassword)
    }, {
        userName,
        password: doCrypto(password)
    })
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(changePasswordFileInfo)
}

async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login,
    changePassword,
    changeInfo,
    logout
}