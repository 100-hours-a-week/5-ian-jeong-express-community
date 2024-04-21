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


export default {
    getPosts,
    createPost
};
