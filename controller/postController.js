const mongoose =require( "mongoose" );
const  postSchema =require("../model/postModel")

const Post = mongoose.model('post', postSchema)

const newPost = async (req, res) => {
    try {
       let newC = new Post(req.body)
       console.log(req.user);
       newC.user_id = req.user.id
    const resp = await newC.save()
    res.json(resp)
   } catch (error) {
    console.log(error);
    res.json(error)
   }
}

const getAllPosts = async (req, res) => {
    console.log('ABCD');

    const allposts= await Post.find({})
    if (allposts) {
        res.send(allposts)
    }
    else{
        res.send('Error')
    }
}
const getPostbyId = async (req, res) => {
    try {
        console.log('ABC');
        console.log(req.params.id);
        const singlePost = await Post.findOne({_id: req.params.id})
        console.log(singlePost);
        if (singlePost) {
            res.send(singlePost)
        } else {
            res.send('No post found')
        }
    } catch (error) {
        res.send('No post found')
    }
  
    
}
const likePost = async (req, res) => {
    try {
        const check = await Post.findOne({_id:req.body.id, usersLiked: {$in: [`${req.user.id}`]}})
        if (check) {
            res.send('Already liked')
        } else {
            
            const singlePost = await Post.findOneAndUpdate({_id: req.body.id}, { $inc: { likes: 1}, $push: {usersLiked: req.user.id}}, {new: true})
            console.log(singlePost);
            if (singlePost) {
                res.send(singlePost)
            } else {
                res.send('No post found')
            }
        }
    } catch (error) {
        res.send('No post found')
    }
  
}
const commentPost = async (req, res) => {
    try {
            console.log(req.user);
            const singlePost = await Post.findOneAndUpdate({_id: req.body.id}, {$push: {comments: {id: req.user.id, name: req.user.name, comment: req.body.comment}}}, {new: true})
            console.log(singlePost);
            if (singlePost) {
                res.send(singlePost)
            } else {
                res.send('No post found')
            }
        
    } catch (error) {
        res.send('No post found')
    }
  
}

module.exports={newPost, getAllPosts, getPostbyId, likePost, commentPost}