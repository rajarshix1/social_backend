const { newPost, getAllPosts, getPostbyId, likePost, commentPost } = require("../controller/postController")
const { newUser, login } =  require("../controller/userController")

const routes = (app) => {
    
    
    app.route('/user')
    .post(newUser)

    app.route('/login')
    .post(login)

    app.route('/post')
    .get(getAllPosts)
    .post(newPost)

    app.route('/post/:id')
    .get(getPostbyId)

    app.route('/post/create')
    .post(newPost)

    app.route('/post/like')
    .post(likePost)
    app.route('/post/comment')
    .post(commentPost)

    
}
module.exports = routes
