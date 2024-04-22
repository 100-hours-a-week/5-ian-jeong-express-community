import model from '../models/postModel.js';

function getPosts(req, res) {
    const postsJson = model.getPosts();

    res.json(postsJson);
}

function createPost(req, res) {

    const newPost = {
        writer : 1,
        title : req.body.title,
        content : req.body.post,
        image : req.body.image
    }
    
    model.createPost(newPost);

    
    
    res.redirect('http://localhost:8080/posts');
}


function getPost(req, res) {
    const post = model.getPost(req.params.postId);

    res.json(post);
}

function getComments(req, res) {
    const comments = model.getComments(req.params.postId);
    
    res.json(comments);
}

function deletePost(req, res) {
    model.deletePost(req.params.postId);   
}


function updatePost(req, res) {
    const post = {
        id: parseInt(req.params.postId),
        title : req.body.title,
        content : req.body.content,
        image : req.body.image
    }
    console.log(post);

    model.updatePost(post); // 여기 할 차례
+
    res.redirect(`http://localhost:8080/posts/${post.id}`);
}




export default {
    getPosts,
    createPost,
    getPost,
    getComments,
    deletePost,
    updatePost
};
