const xss = require('xss')
const {createBlog,getFollowerBlogList} = require('../services/blog')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {createBlogFailInfo} = require('../model/ErrorInfo')
const {PAGE_SIZE, REG_FOR_AT_WHO} = require('../conf/constant')
const {getUserInfo} = require('../services/user')

async function create({userId, content, image}) {
    const atUserNameList = []
    content = content.replace(REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            atUserNameList.push(userName)
            return matchStr
        }
    )
    const atUserList = await Promise.all(atUserNameList.map(userName=>{
        getUserInfo(userName)
    }))
    const atUserIdList = atUserList.map(user=>user.id)
    try {
        const blog = createBlog({
            userId,
            content: xss(content),
            image
        })

        await Promise.all(auUserIdList.map(
            userId=>createAtRelation(blog.id,userId)
        ))
        return new SuccessModel
    }catch (ex){
        console.error(ex.message,ex.stact)
        return new ErrorModel(createBlogFailInfo)
    }
}

async function getHomeBlogList(userId,pageIndex = 0) {
    const result = await getFollowerBlogList({
        userId,
        pageIndex,
        pageSize:PAGE_SIZE
    })
    const {count,blogList} =result
    return new SuccessModel({
        isEmpty:blogList.length===0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList
}