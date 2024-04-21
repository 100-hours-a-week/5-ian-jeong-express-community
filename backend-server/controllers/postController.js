import model from '../models/postModel.js';

function getPosts(req, res) {
    console.log('asd');
    const postsJson = model.getPosts();
    console.log(postsJson);

    res.json(postsJson);
}


export default {
    getPosts
};
