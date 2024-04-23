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
    // 게시글 아이디 부여 문제 해결 하고 다시 노션 작성
    let newPostId = parseInt(postsJsonData[postsJsonData.length-1].id) + 1;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace('T', ' ').split('.')[0];

    const post = {
        id: newPostId,
        writer: newPost.writer,
        title: newPost.title,
        image: newPost.image,
        time: formattedDate,
        content: newPost.content,
        likes : 0,
        hits: 0,
        comments: 0
    };

    postsJsonData.push(post);

    const newPostsJson = JSON.stringify(postsJsonData);
    
    fs.writeFileSync(__dirname + '/models/posts.json', newPostsJson, 'utf8');
}




function getPost(postId) {
    const postsJsonFile = fs.readFileSync(__dirname + '/models/posts.json', 'utf8');
    const postsJsonData = JSON.parse(postsJsonFile);

    for (let i = 0; i < postsJsonData.length; i++) {
        let post = postsJsonData[i];
        if (post.id === parseInt(postId)) {

            const commentsJsonFile = fs.readFileSync(__dirname + '/models/comments.json', 'utf8');
            const commentsJsonData = JSON.parse(commentsJsonFile);
            var count = 0;
            for (let j = 0; j < commentsJsonData.length; j++) {
                if (post.id === commentsJsonData[j].postId) {
                    count++;
                }
            }
            postsJsonData[i].comments = count;
            fs.writeFileSync(path.join(__dirname, '/models/posts.json'), JSON.stringify(postsJsonData), 'utf8');
            post = postsJsonData[i];

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
    // 나중에 댓글도 지워야함
    fs.writeFileSync(path.join(__dirname, '/models/posts.json'), deletedJsonData, 'utf8');
}


function updatePost(post) {
    // Id로 기존 포스트에서 작성자 아이디 가져와서 붙여주고 나머지 
    // 아이디, 작성자아이디, 타이틀, 타임, 이미지, 컨텐트, 라이크,히츠, 코멘츠 붙이고 업데이트 ㄱㄱ
    const postsJsonFile = fs.readFileSync(__dirname + '/models/posts.json', 'utf8');
    const postsJsonData = JSON.parse(postsJsonFile);


    for (let i = 0; i < postsJsonData.length; i++) {
        if (parseInt(post.id) === parseInt(postsJsonData[i].id)) {
            postsJsonData[i].title = post.title;
            postsJsonData[i].content = post.content;
        } 
    }
    

    // postsJsonData[post.id].image =  이미지 수정 생략
    const result = JSON.stringify(postsJsonData);
    


    fs.writeFileSync(path.join(__dirname, '/models/posts.json'), result);
}


function createComment(newComment) {
    const commentsJsonFile = fs.readFileSync(__dirname + '/models/comments.json', 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);

    let newCommentId = parseInt(commentsJsonData[commentsJsonData.length-1].id) + 1;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace('T', ' ').split('.')[0];

    const post = {
        id: newCommentId,
        postId: parseInt(newComment.postId),
        writer: parseInt(newComment.writer),
        time: formattedDate,
        text: newComment.text
    };


    commentsJsonData.push(post);

    const newCommentsJson = JSON.stringify(commentsJsonData);
    
    fs.writeFileSync(__dirname + '/models/comments.json', newCommentsJson,'utf8');
}


function deleteComment(postId, commentId) {
    const commentsJsonFile = fs.readFileSync(__dirname + '/models/comments.json', 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);
    const filteredData = commentsJsonData.filter(comment => comment.id !== parseInt(commentId));

    const deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, '/models/comments.json'), deletedJsonData, 'utf8');
}


function updateComment(comment) {
    const commentsJsonFile = fs.readFileSync(__dirname + '/models/comments.json', 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);

    
    for (let i = 0; i < commentsJsonData.length; i++) {
        if(parseInt(commentsJsonData[i].id) === parseInt(comment.id)) {
            commentsJsonData[i].text = comment.text;
        }
    }



    // postsJsonData[post.id].image =  이미지 수정 생략
    const result = JSON.stringify(commentsJsonData);
    
    fs.writeFileSync(path.join(__dirname, '/models/comments.json'), result, 'utf8');
}




export default {
    getPosts,
    createPost,
    getPost,
    getComments,
    deletePost,
    updatePost,
    createComment,
    deleteComment,
    updateComment
};