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
    console.log(user);
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
    const filteredData = usersJsonData.filter(user => user.id !== parseInt(userId));

    const deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, '/models/comments.json'), deletedJsonData, 'utf8');
}


export default {
    validateUser,
    validateDuplicatedEmail,
    validateDuplicatedNickname,
    createUser,
    getUser,
    updateUser,
    deleteUser
};