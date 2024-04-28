

BACKEND_IP_PORT = localStorage.getItem('backend-ip-port');

const form = document.getElementById("sign-up-form");
const preview = document.getElementById("preview");





function addImage(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) { // Reader 에 이벤트 핸들러 할당
            preview.src = e.target.result; 
        }
        reader.readAsDataURL(file); // 파일을 읽어서 데이터 URL로 변환, 변환 완료 되면 reader가 가진 이벤트 발생
    
        document.getElementById("profile-helper-text").style.visibility = "hidden";

        return;
    } 

    preview.src = "";
    document.getElementById("profile-circle").value = "";
    document.getElementById("profile-helper-text").style.visibility = "visible";
}




const signUpBtn = document.getElementById('sign-up-btn');

let isCorrentEmail = false;
let isCorrectPassword = false;
let isCorrectRePassword = false;
let isCorrectNickname = false;

const emailInput = document.getElementById("email-input");

emailInput.addEventListener("input", async (event) => {
    let value = event.target.value;
    let emailHelper = document.getElementById("email-input-helper-text");

    if (!value) { // 비어있는 경우
        emailHelper.style.visibility = "visible";
        emailHelper.style.color = "#FF0000";
        emailHelper.textContent = "*이메일을 입력해주세요";
        isCorrentEmail = false;

    } else if (!validateEmailFormat(value)) { // 형식이 짧은 경우
        emailHelper.style.visibility = "visible";
        emailHelper.style.color = "#FF0000";
        emailHelper.textContent = "*올바른 이메일 주소 형식을 입력해주세요. (예:example@example.com)";
        isCorrentEmail = false;

      
    } else {
        const flag = {'flag' : false};

        await validateDuplicateEmail(value, flag);
        console.log(`이메일 중복 검사결과: ${flag['flag']}`);

        if (flag['flag']) {
            // emailHelper.style.visibility = "hidden";
            emailHelper.style.visibility = "visible";
            emailHelper.style.color = "#0040FF";
            emailHelper.textContent = "*사용가능한 이메일입니다.";
    
            isCorrentEmail = true;
        } else {
            emailHelper.style.visibility = "visible";
            emailHelper.style.color = "#FF0000";
            emailHelper.textContent = "*중복된 이메일 입니다.";
            isCorrentEmail = false;
        }
    }

    validateAll();
});

function validateEmailFormat(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailRegex.test(email);
}

async function validateDuplicateEmail(email, flag) {
    await fetch(`${BACKEND_IP_PORT}/users/email?email=${email}`)
        .then(isDuplicated => isDuplicated.json())
        .then(isDuplicatedJson => {
            if (isDuplicatedJson.result === "true") {
                flag['flag'] = true;
            }
       });
}





const passwordInput = document.getElementById("password-input");

passwordInput.addEventListener("input", async (event) => {
    let value = event.target.value;
    let passwordHelper = document.getElementById("password-input-helper-text");

    if (!value) {
        passwordHelper.style.visibility = "visible";
        passwordHelper.style.color = "#FF0000";
        passwordHelper.textContent = "*비밀번호를 입력해주세요";
        isCorrectPassword = false;

    } else if(!validatePasswordFormat(value)) {
        passwordHelper.style.visibility = "visible";
        passwordHelper.style.color = "#FF0000";
        passwordHelper.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포합해야 합니다.";
        isCorrectPassword = false;
        
    } else {
        passwordHelper.style.color = "#0040FF";
        passwordHelper.textContent = "*사용가능한 비밀번호입니다.";
        isCorrectPassword = true; 
    }

    validateAll();
});





const rePasswordInput = document.getElementById("re-password-input");

rePasswordInput.addEventListener("input", async (event) => {
    let value = event.target.value;
    let rePasswordHelper = document.getElementById("re-password-input-helper-text");


    if (!value) {
        rePasswordHelper.style.visibility = "visible";
        rePasswordHelper.style.color = "#FF0000";
        rePasswordHelper.textContent = "*비밀번호를 한번 더 입력해주세요";
        isCorrectRePassword = false;

    } else if(!validatePasswordDouble()) {
        rePasswordHelper.style.visibility = "visible";
        rePasswordHelper.style.color = "#FF0000";
        rePasswordHelper.textContent = "*비밀번호가 다릅니다.";
        isCorrectRePassword = false;

    } else {
        rePasswordHelper.style.color = "#0040FF";
        rePasswordHelper.textContent = "*비밀번호가 일치합니다.";
        isCorrectRePassword = true;
    }
    
    validateAll();
});

function validatePasswordFormat(password) {
    const passwordRegax = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

    return passwordRegax.test(password);
}

function validatePasswordDouble() {
    const password = document.getElementById("password-input").value;
    const rePassowrd = document.getElementById("re-password-input").value;

    return password === rePassowrd;
}






const nicknameInput = document.getElementById("nickname-input");

nicknameInput.addEventListener("input", async (event) => {
    const value = event.target.value;
    const nicknameHelper = document.getElementById("nickname-input-helper-text");


    if (!value) {
        nicknameHelper.style.visibility = "visible";
        nicknameHelper.style.color = "#FF0000";
        nicknameHelper.textContent = "*닉네임을 입력해주세요.";
        isCorrectNickname = false;   

    } else if (value.search(/\s/) != -1) {
        nicknameHelper.style.visibility = "visible";
        nicknameHelper.style.color = "#FF0000";
        nicknameHelper.textContent = "*띄어쓰기를 없애주세요.";
        isCorrectNickname = false;   


    } else if (value.length > 11) {
        nicknameHelper.style.visibility = "visible";
        nicknameHelper.style.color = "#FF0000";
        nicknameHelper.textContent = "*닉네임은 최대 10자 까지 작성 가능합니다.";
        isCorrectNickname = false;   

        
    } else {
        const flag = {'flag' : false};
            
        await validateDuplicateNickname(value, flag);
        console.log(`닉네임 중복 검사결과: ${flag['flag']}`);
        if (flag['flag']) {
            nicknameHelper.style.visibility = "visible";
            nicknameHelper.style.color = "#0040FF";
            nicknameHelper.textContent = "*사용가능한 닉네임입니다.";
            isCorrectNickname = true;
    
        } else {
            nicknameHelper.style.visibility = "visible";
            nicknameHelper.style.color = "#FF0000";
            nicknameHelper.textContent = "*중복된 닉네임 입니다.";
            isCorrectNickname = false;
        }
    }
    
    validateAll();
});


async function validateDuplicateNickname(nickname, flag) {
    await fetch(`${BACKEND_IP_PORT}/users/nickname?nickname=${nickname}`)
        .then(isDuplicated => isDuplicated.json())
        .then(isDuplicatedJson => {
            if(isDuplicatedJson.result === "true") {
                flag['flag'] = true;
            }
       });
}


function validateAll() {
    if (isCorrentEmail && isCorrectPassword && isCorrectRePassword && isCorrectNickname) {
        signUpBtn.style.backgroundColor = '#7F6AEE';
        signUpBtn.disabled = false;
    } else {
        signUpBtn.style.backgroundColor = '#ACA0EB';
        signUpBtn.disabled = true;
    }
}




signUpBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    
    // 여기서 
    const obj = {
        email : `${emailInput.value}`,
        password: `${passwordInput.value}`,
        nickname: `${nicknameInput.value}`,
        profileImage: `${preview.src}`
    }
        
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }

    await fetch(`${BACKEND_IP_PORT}/users`, data)
        .then(response => {
        if (response.status === 201) {
          form.submit();
        } else {
          console.log('서버에서 잘못된 응답 코드를 받았습니다.');
        }
      })
      .catch(error => {
        console.error('fetch error:', error);
      });
});


