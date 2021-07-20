const seq = require('../seq')
const {STRING, DECIMAL} = require('../types')
const User = seq.define('users', {
    userName: {
        type: STRING,
        allowNull: false,
        default: '',
        comment: '用户名称',
        unique: true,
    },
    password: {
        type: STRING,
        default: '',
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: STRING,
        default: '',
        allowNull: false,
        comment: '昵称'
    },
    gender: {
        type: DECIMAL,
        default: 0,
        allowNull: false,
        comment: '0:保密,1:女,2:男'
    },
    picture: {
        type: STRING,
        default: '',
        allowNull: false,
        comment: '头像,url地址'
    },
    city: {
        type: STRING,
        allowNull: false,
        default: ''
    }
})

module.exports = User