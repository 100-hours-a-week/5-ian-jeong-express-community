import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();




function getPosts() {
    const postsJsonFile = fs.readFileSync(__dirname + '/models/posts.json', 'utf8');
    const postsJsonData = JSON.parse(postsJsonFile);

    return postsJsonData;
}




function createPost(newPost) {
    const postsJsonFile = fs.readFileSync(__dirname + '/models/posts.json', 'utf8');
    const postsJsonData = JSON.parse(postsJsonFile);

    let newPostId = postsJsonData.length + 1;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace('T', ' ').split('.')[0];

    const post = {
        id: newPostId,
        writer: newPost.writer,
        title: newPost.title,
        image: newPost.image,
        time: formattedDate,
        content: newPost.contnet,
        likes : 0,
        hits: 0,
        comments: 0
    };

    postsJsonData.push(post);

    const newPostsJson = JSON.stringify(postsJsonData);
    
    fs.writeFileSync(__dirname + '/models/posts.json', newPostsJson,'utf8');
}




function getPost(postId) {
    const postsJsonFile = fs.readFileSync(__dirname + '/models/posts.json', 'utf8');
    const postsJsonData = JSON.parse(postsJsonFile);

    for (let i = 0; i < postsJsonData.length; i++) {
        let post = postsJsonData[i];
        if (post.id === parseInt(postId)) {
            return post;
        }
    }
}


function getComments(postId) {
    const commentsJsonFile = fs.readFileSync(__dirname + '/models/comments.json', 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);

    

    return commentsJsonData.filter(comment => comment.postId === parseInt(postId));
}


function deletePost(postId) {
    const postsJsonFile = fs.readFileSync(__dirname + '/models/posts.json', 'utf8');
    const postsJsonData = JSON.parse(postsJsonFile);
    const filteredData = postsJsonData.filter(post => post.id !== parseInt(postId));


    const deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, '/models/posts.json'), deletedJsonData);
}


export default {
    getPosts,
    createPost,
    getPost,
    getComments,
    deletePost
};