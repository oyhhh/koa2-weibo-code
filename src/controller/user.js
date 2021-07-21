const {getUserInfo, createUser} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo,
    registerFailInfo,
    registerUserNameExistInfo,
    loginFailInfo} = require('../model/ErrorInfo')
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

async function login(ctx,userName,password) {
    const userInfo=await getUserInfo(userName,password)
    if(!userInfo){
        return new ErrorModel(loginFailInfo)
    }
    if(ctx.session.userInfo==null){
        ctx.session.userInfo=userInfo
    }
    return new SuccessModel()
}

module.exports = {
    isExist,
    register
}