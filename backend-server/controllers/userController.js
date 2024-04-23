import model from '../models/userModel.js';

function validateUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const isValid = model.validateUser(email, password)
    const resultJson = {
        result : `${isValid}`
    }

    res.json(resultJson);
}

function validateDuplicatedEmail(req, res) {
    const email = req.query.email;
    const isValid = model.validateDuplicatedEmail(email);

    const resultJson = {
        result : `${isValid}`
    }

    res.json(resultJson);
}
 
function validateDuplicatedNickname(req, res) {
    const nickname = req.query.nickname;
    const isValid = model.validateDuplicatedNickname(nickname);

    const resultJson = {
        result : `${isValid}`
    }

    res.json(resultJson);
}

function createUser(req, res) {
    // 하기전에, 유저 아이디 부여, 하고 바디에서 데이터꺼내는 법 확인

    const newUser = {
        email : req.body.email,
        password : req.body.password,
        nickname : req.body.nickname,
        profileImage : req.body.profileImage
    }
    
    model.createUser(newUser);

    // Res 뭐해야하지
    // 로그인 창으로 리다이렉트
    res.redirect('http://localhost:8080/users/sign-in');
}

function getUser(req, res) {
    const user = model.getUser(req.params.userId);

    res.json(user);
}

function updateUser(req, res) {

    const user = {
        id: parseInt(req.params.userId),
        nickname: req.body.nickname,
        profileImage: req.body.profileImage
    }

    model.updateUser(user); // 여기 할 차례
    res.redirect(`http://localhost:8080/users/${user.id}`);
}

function deleteUser(req, res) {
    model.deleteUser(req.params.userId);
}

function updateUserPassword(req, res) {
    const user = {
        id: parseInt(req.params.userId),
        password: req.body.password
    }
    
    model.updateUserPassword(user); // 여기 할 차례
    res.redirect(`http://localhost:8080/users/${user.id}/password`);
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
