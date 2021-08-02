const {getAtRelationCount,getAtUserBlogList,updateAtRelation} = require('../services/at-relation')
const {SuccessModel,ErrorModel}=require('../model/ResModel')
const {PAGE_SIZE}=require('../conf/constant')
async function getAtMeCount(userId){
    const count = await getAtRelationCount(userId)
    return new SuccessModel({
        count
    })
}

async function getAtMeBlogList(userId,pageIndex=0){
    const result = await getAtUserBlogList({
        userId,
        pageIndex,
        pageSize:PAGE_SIZE
    })
    const {count,blogList}=result
    return new SuccessModel({
        isEmpty:blogList.length===0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count
    })
}

async function markAsRead(userId){
    try{
        await  updateAtRelation(
            {newIsRead:true},
            {userId,isRead:false}
        )
    }catch (ex){
        console.error(ex)
    }
}

module.exports = {
    getAtMeCount,
    getAtMeBlogList,
    markAsRead
}