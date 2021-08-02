const router = require('koa-router')()
const {loginRedirect} = require('../../middlewares/loginCheck')
const {getHomeBlogList} = require('../../controller/blog')
const {getFans,getFollowers} = require('../../controller/user-relation')

router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const {id:userId}=userInfo
    const result =await getHomeBlogList(userId)
    const {isEmpty,blogList,pageSize,pageIndex,count} = result.data
    const fansResult =await getFans(userId)
    const {count:fansCount,fansList} =fansResult.data
    const followersResult =await  getFollowers(userId)
    const {count:followersCount,followersList}= followersResult.data

    const atCountResult = await  getAtMeCount(userId)
    const {count:atCount}= atCountResult.data
    await ctx.render('index',{
        userData:{
            userInfo,
            fansData:{
                count:fansCount,
                list:fansList
            },
            followersData:{
                count:followersCount,
                list:followersList
            },
            atCount
        },
        blogData:{
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})
module.exports = router
