import fs from 'fs'
import path from 'path';

const __dirname = path.resolve();
const usersDataPath = '/models/repository/users.json';
const postsDataPath = '/models/repository/posts.json';
const commentsDataPath = '/models/repository/comments.json';



function validateUser(email, password) {

    const usersJsonFile = fs.readFileSync(__dirname + usersDataPath, 'utf8');
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
    const usersJsonFile = fs.readFileSync(__dirname + usersDataPath, 'utf8');
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
    const usersJsonFile = fs.readFileSync(__dirname + usersDataPath, 'utf8');
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
    const usersJsonFile = fs.readFileSync(__dirname + usersDataPath, 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    let newUserId = parseInt(usersJsonData[usersJsonData.length-1].id) + 1;

    const user = {
        id: newUserId,
        email: newUser.email,
        password: newUser.password,
        nickname: newUser.nickname,
        profileImage: newUser.profileImage
    };

    usersJsonData.push(user);

    const newUsersJson = JSON.stringify(usersJsonData);
    
    fs.writeFileSync(__dirname + usersDataPath, newUsersJson,'utf8');
}

function getUser(userId) {
    const usersJsonFile = fs.readFileSync(__dirname + usersDataPath, 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (let i = 0; i < usersJsonData.length; i++) {
        let user = usersJsonData[i];
        if (user.id === parseInt(userId)) {
            return user;
        }
    }
}

function getUserId(email) {
    const usersJsonFile = fs.readFileSync(__dirname + usersDataPath, 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (let i = 0; i < usersJsonData.length; i++) {
        let user = usersJsonData[i];
        if (user.email === email) {
            return parseInt(user.id);
        }
    }
}


function updateUser(user) {
    const usersJsonFile = fs.readFileSync(__dirname + usersDataPath, 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (let i = 0; i < usersJsonData.length; i++) {
        if (parseInt(user.id) === parseInt(usersJsonData[i].id)) {
            usersJsonData[i].nickname = user.nickname;
            usersJsonData[i].profileImage = user.profileImage;
        }
    }
    
    const result = JSON.stringify(usersJsonData);
    fs.writeFileSync(path.join(__dirname, usersDataPath), result, 'utf8');
}


function deleteUser(userId) {
    const usersJsonFile = fs.readFileSync(__dirname + usersDataPath, 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);
    let filteredData = usersJsonData.filter(user => user.id !== parseInt(userId));
    let deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, usersDataPath), deletedJsonData, 'utf8');


    const commentsJsonFile = fs.readFileSync(__dirname + commentsDataPath, 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);
    filteredData = commentsJsonData.filter(comment => parseInt(comment.writer) !== parseInt(userId));
    deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, commentsDataPath), deletedJsonData, 'utf8');


    const postsJsonFile = fs.readFileSync(__dirname + postsDataPath, 'utf8');
    const postsJsonData = JSON.parse(postsJsonFile);
    filteredData = postsJsonData.filter(post => post.writer !== parseInt(userId));
    deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, postsDataPath), deletedJsonData, 'utf8');
}

function updateUserPassword(user) {
    const usersJsonFile = fs.readFileSync(__dirname + usersDataPath, 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (let i = 0; i < usersJsonData.length; i++) {
        if (parseInt(user.id) === parseInt(usersJsonData[i].id)) {
            usersJsonData[i].password = user.password;
        }
    }
    
    const result = JSON.stringify(usersJsonData);
    fs.writeFileSync(path.join(__dirname, usersDataPath), result, 'utf8');
}

function initData() {
    if (!fs.existsSync(path.join(__dirname, usersDataPath))) {
        const adminData = [
            {
                id: 0,
                email: 'jms0538@naver.com',
                password: 'Admin12!@',
                nickname: 'admin',
                profileImage: ''
            }
        ];
        
        
        fs.writeFileSync(path.join(__dirname, usersDataPath), JSON.stringify(adminData), 'utf8');
    } 


    if (!fs.existsSync(path.join(__dirname, postsDataPath))) {
        const adminPostData = [
            {
                id: 0,
                title: '환영합니다!',
                time: '2024-05-01 11:00:00',
                image: '',
                content: '반값습니다. 환영합니다.',
                likes: 0,
                hits: 0,
                comments: 0
            }
        ];
        
        
        fs.writeFileSync(path.join(__dirname, usersDataPath), JSON.stringify(adminPostData), 'utf8');
    }


    if (!fs.existsSync(path.join(__dirname, commentsDataPath))) {
        const adminPostData = [
            {
                id: 0,
                postId: 0,
                writer: 0,
                time: '2024-05-01 11:00:00',
                text: '반값습니다.'
            }
        ];
        
        
        fs.writeFileSync(path.join(__dirname, usersDataPath), JSON.stringify(adminPostData), 'utf8');
    } 
    

}


export default {
    validateUser,
    validateDuplicatedEmail,
    validateDuplicatedNickname,
    createUser,
    getUser,
    getUserId,
    updateUser,
    deleteUser,
    updateUserPassword,
    initData
};