import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();

function validateUser(email, password) {
    //user.json파일 읽기
    const usersJsonFile = fs.readFileSync(__dirname + '/models/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (let i = 0; i < usersJsonData.length; i++) {
        let user = usersJsonData[i];
        if (user.email === email && user.password === password) {
            return true;
        }
    }
    
    return false;
}

function validateDuplicatedEmail(email) {
    const usersJsonFile = fs.readFileSync(__dirname + '/models/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (let i = 0; i < usersJsonData.length; i++) {
        let user = usersJsonData[i];
        if (user.email === email) {
            return false;
        }
    }
    
    return true;
}

function validateDuplicatedNickname(nickname) {
    const usersJsonFile = fs.readFileSync(__dirname + '/models/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (let i = 0; i < usersJsonData.length; i++) {
        let user = usersJsonData[i];
        if (user.nickname === nickname) {
            return false;
        }
    }
    
    return true;
}

function createUser(newUser) {
    // 읽단 읽어서 유저 아이디 파악하고 아이디 정하고 json에 append
    const usersJsonFile = fs.readFileSync(__dirname + '/models/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    let newUserId = usersJsonData.length + 1;

    const user = {
        id: newUserId,
        email: newUser.email,
        password: newUser.password,
        nickname: newUser.nickname,
        profileImage: newUser.profileImage
    };

    usersJsonData.push(user);

    const newUsersJson = JSON.stringify(usersJsonData);
    
    fs.writeFileSync(__dirname + '/models/users.json', newUsersJson,'utf8');
}

function getUser(userId) {
    const usersJsonFile = fs.readFileSync(__dirname + '/models/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (let i = 0; i < usersJsonData.length; i++) {
        let user = usersJsonData[i];
        if (user.id === parseInt(userId)) {
            return user;
        }
    }
}


function updateUser(user) {
    const usersJsonFile = fs.readFileSync(__dirname + '/models/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    usersJsonData[parseInt(user.id)-1].nickname = user.nickname;
    usersJsonData[parseInt(user.id)-1].profileImage = user.profileImage;
    
    

    // postsJsonData[post.id].image =  이미지 수정 생략
    const result = JSON.stringify(usersJsonData);
    
    fs.writeFileSync(path.join(__dirname, '/models/users.json'), result, 'utf8');
}

function deleteUser(userId) {
    const usersJsonFile = fs.readFileSync(__dirname + '/models/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);
    var filteredData = usersJsonData.filter(user => user.id !== parseInt(userId));

    var deletedJsonData = JSON.stringify(filteredData);


    fs.writeFileSync(path.join(__dirname, '/models/users.json'), deletedJsonData, 'utf8');

    // 유저 관련 포스트와 댓글도 모두 삭제 ㄱㄱ
    // 일단 댓글 모두 삭제하고 댓글에 대한 게시글 댓글 수 수정하고
    const commentsJsonFile = fs.readFileSync(__dirname + '/models/comments.json', 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);
    filteredData = commentsJsonData.filter(comment => comment.writer !== parseInt(userId));

    deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, '/models/comments.json'), deletedJsonData, 'utf8');


    // 댓글 수 수정 로직
    var postsJsonFile = fs.readFileSync(__dirname + '/models/posts.json', 'utf8');
    var postsJsonData = JSON.parse(postsJsonFile);

    for (let i = 0; i < postsJsonData.length; i++) {
        var count = 0;
        for (let j = 0; j < filteredData.length; j++) {
            if (filteredData[j].writer === postsJsonData[i].id) {
                count += 1;
            }
        }
        postsJsonData[i].comments = count; 
    }

    const result = JSON.stringify(postsJsonData);
    
    fs.writeFileSync(path.join(__dirname, '/models/posts.json'), result);

    // 관련 게시글 모두 삭제
    postsJsonFile = fs.readFileSync(__dirname + '/models/posts.json', 'utf8');
    postsJsonData = JSON.parse(postsJsonFile);
    filteredData = postsJsonData.filter(post => post.writer !== parseInt(userId));

    deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, '/models/posts.json'), deletedJsonData, 'utf8');
}

function updateUserPassword(user) {
    const usersJsonFile = fs.readFileSync(__dirname + '/models/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    usersJsonData[parseInt(user.id)-1].password = user.password;
    
    const result = JSON.stringify(usersJsonData);
    
    fs.writeFileSync(path.join(__dirname, '/models/users.json'), result, 'utf8');
}


export default {
    validateUser,
    validateDuplicatedEmail,
    validateDuplicatedNickname,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    updateUserPassword
};