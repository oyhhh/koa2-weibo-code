const {DEFAULT_PRICTURE, REG_FOR_AT_WHO} = require('../conf/constant')
const {timeFormat} = require('./../utils/dt')

function _formatUserPicture(obj) {
    return obj.picture ? obj.picture : DEFAULT_PRICTURE
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户信息
 */

function formatUser(list) {
    if (!list) {
        return list
    }
    if (list instanceof Array) {
        return list.map(_formatUserPicture)
    }

    return _formatUserPicture(list)
}

function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAr)
}

function _formatContent(obj) {
    obj.contentFormat = obj.content
    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href="/profile/${userName}">@${nickName}</a>`
        }
    )
    return obj
}

function formatBlog(list) {
    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        return list.map(_formatDBTime).map(_formatContent)
    }
    let result = list
    result = _formatDBTime(result)
    result = _formatContent(result)
    return result
}

module.exports = {
    formatUser,
    formatBlog
}