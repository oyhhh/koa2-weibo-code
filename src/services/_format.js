const {DEFAULT_PRICTURE} = require('../conf/constant')

function _formatUserPicture(obj) {
    return obj.picture ? obj.picture : DEFAULT_PRICTURE
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户信息
 */

function formatUser(list){
    if(!list){
        return list
    }
    if(list instanceof Array){
        return list.map(_formatUserPicture)
    }
    
    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}