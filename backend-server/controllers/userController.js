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
    const newUser = {
        email : req.body.email,
        password : req.body.password,
        nickname : req.body.nickname,
        profileImage : req.body.profileImage
    }
    
    model.createUser(newUser);

    res.status(201).send('sign_up_create_success');
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

    model.updateUser(user); 
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
    
    model.updateUserPassword(user); 
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
