export async function fetchPost(pageNumber=1,pageSize=20){
    //connectToDB();

    //pagination : calculate the number of posts to skip
    const skipAmmount = (pageNumber - 1)* pageSize;



    //fetch posts that have no parents
    // const postQuery=Thread.find
    // ({parentId:{$in:[null,undefined]}})
    //.sort({createdAt:'desc'})
    //.skip(skipAmount)
    //.limit(pageSize)
    //.populate({
    //path:'children',
    //populate:{
    //  path:'author',
    //  model:User,
    //  select:"_id name parentId image"
    //}    
    //})

    // const totalPostCount=await Thread.countDocuments({parentId:{$in:[null,undefined]});

    // const posts =await postsQuery.exec();

    // const isNext=totalPostsCount > skipAmount + posts.length;

    // return {posts,isNext};
}