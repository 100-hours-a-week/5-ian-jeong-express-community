/**
 * 
 */


function addImage(event) {
    const file = event.target.files[0]; // 선택한 파일 가져오기
    const preview = document.getElementById("preview");
    
    if (file) { // 파일이 있다면
        const reader = new FileReader();

        reader.onload = function(e) { // Reader 에 이벤트 핸들러 할당
            preview.src = e.target.result; 
        }
        reader.readAsDataURL(file); // 파일을 읽어서 데이터 URL로 변환, 변환 완료 되면 reader가 가진 이벤트 발생 
    
        document.getElementById("profile-helper-text").style.visibility = "hidden";

        return;
    } 

    preview.src = "";
    document.getElementById("profile-helper-text").style.visibility = "visible";
}




// 포커스 아웃으로 이메일 검증 (중복 여부는 백엔드에서 검증)
let isCorrentEmail = false;
const emailInput = document.getElementById("email-input");

emailInput.addEventListener("blur", async function(event) {
    let value = event.target.value;
    let emailHelper = document.getElementById("email-input-helper-text");

    if (!value) { // 비어있는 경우
        emailHelper.style.visibility = "visible";
        emailHelper.textContent = "*이메일을 입력해주세요";
        isCorrentEmail = false;

        return;
    } 

    if (!validateEmailFormat(value)) { // 형식이 짧은 경우
        emailHelper.style.visibility = "visible";
        emailHelper.textContent = "*올바른 이메일 주소 형식을 입력해주세요. (예:example@example.com)";
        isCorrentEmail = false;

        return;
    } 

    const flag = {'flag' : false};
        
    await validateDuplicateEmail(value, flag); // 이메일 중복 검사

    if (flag['flag']) {
        emailHelper.style.visibility = "hidden";
        isCorrentEmail = true;

        return;
    }

    emailHelper.style.visibility = "visible";
    emailHelper.textContent = "*중복된 이메일 입니다.";
    isCorrentEmail = false;
});

function validateEmailFormat(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(email);
}

function validateDuplicateEmail(email, flag) {
    // fetch나 ajax는 url이 안바뀜, rest가 아닌 컨트롤 자원에는 동사 허용, 반환값은 중복여부, 중복아니라면 true, 맞다면 false
    // "result" : "true" or "false"

    // 객체를 만들때 키 값 역할을 하는 애는 변수처럼 따옴표로 안감싸도 됨
    // 값은 다 가능. 근데 stingify 하면 키, 벨류 모두 문자열로 바뀌고 그걸 다시 파싱해서 객체로 만들면 키는 따옴표가 없지만 벨류는 문자열로 바뀜
    const obj = {email : `${email}`};

    const data = {
        method: 'POST', // get요청은 캐싱될 수 있고, 검증 부분이 캐싱되면 좋지 않으므로 post요청
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    };

    fetch('localhost:backend-port/validate/email', data) // 바디에 Json 담아서 요청
        .then(isDuplicated => isDuplicated.json())
        .then(isDuplicatedJson => {
            if (isDuplicatedJson.result) {
                flag['flag'] = true;
            }
       });
}




// 비밀번호 & 비밀번호 확인 검증
let isCorrectPassword = false;
const passwordInput = document.getElementById("password-input");

let isCorrectRePassword = false;
const rePasswordInput = document.getElementById("re-password-input");

passwordInput.addEventListener("blur", async function(event) {
    let value = event.target.value;
    let passwordHelper = document.getElementById("password-input-helper-text");
    let rePasswordHelper = document.getElementById("re-password-input-helper-text");

    if (!value) {
        passwordHelper.style.visibility = "visible";
        passwordHelper.textContent = "*비밀번호를 입력해주세요";
        isCorrectPassword = false;

        return;
    }

    if(!validatePasswordFormat(value)) {
        passwordHelper.style.visibility = "visible";
        passwordHelper.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포합해야 합니다.";
        isCorrectPassword = false;
        
        return;
    } 

    if(!validatePasswordDouble()) {
        passwordHelper.style.visibility = "visible";
        passwordHelper.textContent = "*비밀번호가 다릅니다.";
        isCorrectPassword = false;

        return;
    } 

    passwordHelper.style.visibility = "hidden";
    isCorrectPassword = true; 

    rePasswordHelper.style.visibility = "hidden";
    isCorrectRePassword = true; 
});


// 비밀번호 확인 검증
rePasswordInput.addEventListener("blur", async function(event) {
    let value = event.target.value;
    let passwordHelper = document.getElementById("password-input-helper-text");
    let rePasswordHelper = document.getElementById("re-password-input-helper-text");

    if (!value) {
        rePasswordHelper.style.visibility = "visible";
        rePasswordHelper.textContent = "*비밀번호를 한번 더 입력해주세요";
        isCorrectRePassword = false;

        return;
    } 
    if(!validatePasswordFormat(value)) {
        rePasswordHelper.style.visibility = "visible";
        rePasswordHelper.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포합해야 합니다.";
        isCorrectRePassword = false;

        return;
    } 
    if(!validatePasswordDouble()) {
        rePasswordHelper.style.visibility = "visible";
        rePasswordHelper.textContent = "*비밀번호가 다릅니다.";
        isCorrectRePassword = false;

        return;
    } 
    
    rePasswordHelper.style.visibility = "hidden";
    isCorrectRePassword = true;

    passwordHelper.style.visibility = "hidden";
    isCorrectPassword = true; 
});

function validatePasswordFormat(password) {
    const passwordRegax = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

    return passwordRegax.test(password);
}

function validatePasswordDouble() {
    const password = document.getElementById("password-input").value;
    const rePassowrd = document.getElementById("re-password-input").value;

    return password === rePassowrd;
}





// 닉네임 검증
let isCorrectNickname = false;
const nicknameInput = document.getElementById("nickname-input");

nicknameInput.addEventListener("blur", async function(event) {
    const value = event.target.value;
    const nicknameHelper = document.getElementById("nickname-input-helper-text");

    if (!value) {
        nicknameHelper.style.visibility = "visible";
        nicknameHelper.textContent = "*닉네임을 입력해주세요.";
        isCorrectNickname = false;   

        return;
    } 

    if (value.search(/\s/) != -1) { // 공백 확인
        nicknameHelper.style.visibility = "visible";
        nicknameHelper.textContent = "*띄어쓰기를 업애주세요.";
        isCorrectNickname = false;   

        return;
    } 
    
    if (value.length > 11) {
        nicknameHelper.style.visibility = "visible";
        nicknameHelper.textContent = "*닉네임은 최대 10자 까지 작성 가능합니다.";
        isCorrectNickname = false;   

        return;
    } 
    // 넥네임 중복 확인
    const flag = {'flag' : false};
        
    await validateDuplicateNickname(value, flag);

    if (flag['flag']) {
        nicknameHelper.style.visibility = "hidden";
        isCorrectNickname = true;

        return;
    }
    
    nicknameHelper.style.visibility = "visible";
    nicknameHelper.textContent = "*중복된 닉네임 입니다.";
    isCorrectNickname = false;
});


// 백엔드 서버로 요청 넣어서 중복 여부 확인
function validateDuplicateNickname(nickname, flag) {
    const obj = {nickname : `${nicname}`};

    const data = {
        method: 'POST', // get요청은 캐싱될 수 있고, 검증 부분이 캐싱되면 좋지 않으므로 post요청
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    };

    fetch('localhost:back-end port/validate/nickname', data)
        .then(isDuplicated => isDuplicated.json())
        .then(isDuplicatedJson => {
            if(isDuplicatedJson.result) {
                flag['flag'] = true;
            }
       });
}





// 회원가입 버튼 활성화
document.addEventListener('click', function(event) {
    const clickedElement = event.target;
    const signUpBtn = document.getElementById('sign-up-btn');
    
    if (isCorrentEmail && isCorrectPassword && isCorrectRePassword && isCorrectNickname) {
        signUpBtn.style.backgroundColor = '#7F6AEE';
        signUpBtn.disabled = false;

        return;
    } 
     
    signUpBtn.style.backgroundColor = '#ACA0EB';
    signUpBtn.disabled = true;
});

