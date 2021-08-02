/**
 * @description 个人主页
 */
const {getBlogListByUser} = require('../services/blog')
const {PAGE_SIZE} = require('./../conf/constant')
const {SuccessModel} = require('../model/ResModel')

async function getProfileBlogList(userName, pageIndex) {
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const blogList = result.blogList
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getProfileBlogList
}