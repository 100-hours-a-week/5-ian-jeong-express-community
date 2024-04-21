import model from './../models/model.js';

function validateUser(req, res) {
    // 제이슨으로 받은 유저 이메일과 비번 검증하고 
    // 존재한다면 True, 아니라면 false 반환
    // "result" : "true"
    //정상출력확인하면 컨트롤러메서드를 통해 데이터 가져와서 검증하고 반환 ㄱㄱ    
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



export default {
    validateUser,
    validateDuplicatedEmail,
    validateDuplicatedNickname,
    createUser
};
