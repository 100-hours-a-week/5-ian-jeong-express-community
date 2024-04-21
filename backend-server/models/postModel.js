import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();




function getPosts() {
    //post 아이디 부여해야함
    // likes hits comments 0으로
    const postsJsonFile = fs.readFileSync(__dirname + '/models/posts.json', 'utf8');
    const postsJsonData = JSON.parse(postsJsonFile);

    return postsJsonData;
}




function createPost(newPost) {
    const postsJsonFile = fs.readFileSync(__dirname + '/models/posts.json', 'utf8');
    const postsJsonData = JSON.parse(postsJsonFile);

    let newPostId = postsJsonData.length + 1;

    const post = {
        id: newPostId,
        writer: newPost.writer,
        title: newPost.title,
        content: newPost.contnet,
        image: newPost.image,
        likes : 0,
        hits: 0,
        comments: 0
    };

    postsJsonData.push(post);

    const newPostsJson = JSON.stringify(postsJsonData);
    
    fs.writeFileSync(__dirname + '/models/posts.json', newPostsJson,'utf8');
}











export default {
    getPosts,
    createPost
};