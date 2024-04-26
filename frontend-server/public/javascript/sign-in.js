async function validateSignIn(event) {
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const helperText = document.getElementById('helper-text'); 

	if (!validateEmailFormat(email)) { 
        helperText.style.visibility = 'visible'; // 헬퍼 텍스트 노출
        helperText.textContent = "*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)";

        return false;
    }

    if (!password) {
        helperText.style.visibility = 'visible';
        helperText.textContent = "*비밀번호를 입력해주세요.";

        return false;
    }

    if(!validatePasswordFormat(password)) { // 포맷이 안맞는다면
        helperText.style.visibility = 'visible';
        helperText.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포합해야 합니다.";

        return false;
    }

    const flag = {'flag' : false};

    await validateAccount(flag, email, password);

    console.log(flag['flag']);
    if (flag['flag']) {
        document.getElementById('sign-in-btn').style.backgroundColor = '#7F6AEE';
        helperText.style.visibility = 'hidden';
        
        return flag['flag'];
    }
    
    helperText.style.visibility = 'visible';
    helperText.textContent = "*비밀번호가 다릅니다.";
    
            
    return flag['flag'];
}


// 이메일 형식 검증
function validateEmailFormat(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailRegex.test(email);
}

// 비밀번호 형식 검증 
function validatePasswordFormat(password) {
    const passwordRegax = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    return passwordRegax.test(password);

}

// fetch로 백엔드에서 계정 검증
async function validateAccount(flag, email, password) {
    const obj = {
        email : `${email}`,
        password : `${password}`
    }

    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }
    
    await fetch('http://localhost:8081/users/sign-in', data) 
        .then(isAuthenticated => isAuthenticated.json())
        .then(isAuthenticatedJson => {
            console.log(isAuthenticatedJson);
             if(isAuthenticatedJson.result === "true") {
                flag['flag'] = true;
             }
        });
}

// onsubmit 검증이 끝나고 제출되기 전 3초 지연 이벤트
document.getElementById('sign-in-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    await this.onsubmit(event)
        .then(result => {
            if (result) {
                setTimeout(() => {
                    // document.getElementById('sign-in-form').submit();
                    window.location.href = '/posts';
                }, 3000);        
            }
    });
});
