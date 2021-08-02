const seq = require('../seq')
const {INT, STRING, TEXT} = require('../types')
const Blog = seq.define('blogs', {
    userId: {
        type: INT,
        allowNull: false,
        comment: '用户id'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: STRING,
        comment: '图片地址'
    }
})

module.exports = Blog