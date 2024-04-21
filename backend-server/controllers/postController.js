import model from '../models/postModel.js';

function getPosts(req, res) {
    console.log('asd');
    const postsJson = model.getPosts();
    console.log(postsJson);

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

    // Res 뭐해야하지
    // 로그인 창으로 리다이렉트
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




export default {
    getPosts,
    createPost,
    getPost,
    getComments
};
