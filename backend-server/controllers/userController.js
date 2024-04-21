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



export default {
    validateUser,
    validateDuplicatedEmail,
    validateDuplicatedNickname
};
