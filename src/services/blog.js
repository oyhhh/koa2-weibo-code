const {Blog, User,UserRelation,AtRelation} = require('../db/model/index')
const {formatBlog, formatUser} = require('./_format')

async function createBlog({userId, content, image}) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

async function getBlogListByUser({userName, pageIndex = 0, pageSize = 10}) {
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.username = userName
    }
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

async function getFollowerBlogList({userId,pageIndex=0,pageSize=10}){
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize*pageIndex,
        order:[
            ['id','desc']
        ],
        include:[
            {
                model:User,
                attributes:['userName','nickName','picture']
            },
            {
                model: UserRelation,
                attributes: ['userId','followerId'],
                where:{
                    userId
                }
            }
        ]
    })
    let blogList = result.map(row=>row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem=>{
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })
    return{
        count:result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowerBlogList
}