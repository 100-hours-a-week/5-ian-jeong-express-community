import fs from 'fs'
import path from 'path';

const __dirname = path.resolve();

function validateUser(email, password) {

    const usersJsonFile = fs.readFileSync(__dirname + '/models/repository/users.json', 'utf8');
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
    const usersJsonFile = fs.readFileSync(__dirname + '/models/repository/users.json', 'utf8');
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
    const usersJsonFile = fs.readFileSync(__dirname + '/models/repository/users.json', 'utf8');
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
    const usersJsonFile = fs.readFileSync(__dirname + '/models/repository/users.json', 'utf8');
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
    
    fs.writeFileSync(__dirname + '/models/repository/users.json', newUsersJson,'utf8');
}

function getUser(userId) {
    const usersJsonFile = fs.readFileSync(__dirname + '/models/repository/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (let i = 0; i < usersJsonData.length; i++) {
        let user = usersJsonData[i];
        if (user.id === parseInt(userId)) {
            return user;
        }
    }
}

function getUserId(email) {
    const usersJsonFile = fs.readFileSync(__dirname + '/models/repository/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (let i = 0; i < usersJsonData.length; i++) {
        let user = usersJsonData[i];
        if (user.email === email) {
            return parseInt(user.id);
        }
    }
}


function updateUser(user) {
    const usersJsonFile = fs.readFileSync(__dirname + '/models/repository/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    for (let i = 0; i < usersJsonData.length; i++) {
        if (parseInt(user.id) === parseInt(usersJsonData[i].id)) {
            usersJsonData[i].nickname = user.nickname;
            usersJsonData[i].profileImage = user.profileImage;
        }
    }
    
    const result = JSON.stringify(usersJsonData);
    fs.writeFileSync(path.join(__dirname, '/models/repository/users.json'), result, 'utf8');
}

function deleteUser(userId) {
    const usersJsonFile = fs.readFileSync(__dirname + '/models/repository/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);
    let filteredData = usersJsonData.filter(user => user.id !== parseInt(userId));

    let deletedJsonData = JSON.stringify(filteredData);


    fs.writeFileSync(path.join(__dirname, '/models/repository/users.json'), deletedJsonData, 'utf8');

    const commentsJsonFile = fs.readFileSync(__dirname + '/models/repository/comments.json', 'utf8');
    const commentsJsonData = JSON.parse(commentsJsonFile);
    filteredData = commentsJsonData.filter(comment => comment.writer !== parseInt(userId));

    deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, '/models/repository/comments.json'), deletedJsonData, 'utf8');


    let postsJsonFile = fs.readFileSync(__dirname + '/models/repository/posts.json', 'utf8');
    let postsJsonData = JSON.parse(postsJsonFile);

    for (let i = 0; i < postsJsonData.length; i++) {
        let count = 0;
        for (let j = 0; j < filteredData.length; j++) {
            if (filteredData[j].writer === postsJsonData[i].id) {
                count += 1;
            }
        }
        postsJsonData[i].comments = count; 
    }

    const result = JSON.stringify(postsJsonData);
    
    fs.writeFileSync(path.join(__dirname, '/models/repository/posts.json'), result);

    postsJsonFile = fs.readFileSync(__dirname + '/models/repository/posts.json', 'utf8');
    postsJsonData = JSON.parse(postsJsonFile);
    filteredData = postsJsonData.filter(post => post.writer !== parseInt(userId));

    deletedJsonData = JSON.stringify(filteredData);

    fs.writeFileSync(path.join(__dirname, '/models/repository/posts.json'), deletedJsonData, 'utf8');
}

function updateUserPassword(user) {
    const usersJsonFile = fs.readFileSync(__dirname + '/models/repository/users.json', 'utf8');
    const usersJsonData = JSON.parse(usersJsonFile);

    usersJsonData[parseInt(user.id)-1].password = user.password;
    
    const result = JSON.stringify(usersJsonData);
    
    fs.writeFileSync(path.join(__dirname, '/models/repository/users.json'), result, 'utf8');
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
    updateUserPassword
};