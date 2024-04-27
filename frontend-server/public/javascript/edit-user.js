BACKEND_IP_PORT = localStorage.getItem('backend-ip-port');


const userId = 1;


document.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    };
}, true);





const profileImg = document.getElementById("profile-img");
const dropBox = document.getElementById("drop-down-box");

profileImg.addEventListener("click", () => {
    dropBox.style.visibility = "visible";
});

if(dropBox.style.visibility === "visible") {
    document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        if (clickedElement !== profileImg) {
            dropBox.style.visibility = "hidden";
        }
    });
}

document.getElementById('user-edit-btn').addEventListener('click', (event) => {
    window.location.href=`/users/${userId}`;
});

document.getElementById('password-edit-btn').addEventListener('click', (event) => {
    window.location.href=`/users/${userId}/password`;
});









let userNickname;
const nicknameInput = document.getElementById("nickname-edit");


fetch(`http://localhost:8081/users/${userId}`)
    .then(userData => userData.json())
    .then(userJson => {
            document.getElementById("profile-img").src = userJson.profileImage;
            document.getElementById("preview").src = userJson.profileImage;
            nicknameInput.value = userJson.nickname;
            userNickname = userJson.nickname;
    });



function addImage(event) {
    const file = event.target.files[0]; // 선택한 파일 가져오기
    const preview = document.getElementById("preview");
        
    if (file) { // 파일이 있다면
        const reader = new FileReader();
        reader.onload = function(e) { // 파일 읽기가 완료 되었을 때 괄호안에 함수 실행됨
            preview.src = e.target.result; // 이미지를 미리보기에 설정
            document.getElementById("profile-image").value = preview.src;
        }
        reader.readAsDataURL(file); // 파일을 읽어서 데이터 URL로 변환 
        
    } else {
        preview.src = "";
        document.getElementById("profile-image").value = "";
    }
}
    


// 닉네임 비어있으면 닉네임을 입력해주세요
// 닉네임 중복시 중복된 닉네임입니다.
// 닉네임 11자이상 작성시 닉네임 최대 10자 문구 
const editBtn = document.getElementById("edit-btn");
const helperText = document.getElementById("helper-text");

editBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // form 내에서 버튼 클릭 시 리로딩 되니까 헬퍼 텍스트 변경사항이 유지하기 위해
    const value = nicknameInput.value;

    // 입력이 없을 경우
    if (!value) {
        helperText.style.visibility = "visible";
        helperText.textContent = "*닉네임을 입력해주세요.";   

    } else if (value.search(/\s/) != -1) { // 공백 확인
        helperText.style.visibility = "visible";
        helperText.textContent = "*띄어쓰기를 업애주세요.";

    } else if (value.length > 11) { // 11자 이상인지 확인 
        helperText.style.visibility = "visible";
        helperText.textContent = "*닉네임은 최대 10자 까지 작성 가능합니다.";

    } else {
        const flag = {'flag' : false};

        if (value !== userNickname) { // 입력값이 기존 닉네임이 아니라면
            await validateDuplicateNickname(value, flag);
        } else {
            flag['flag'] = true;
        }
        
        if (!flag['flag']) {
            helperText.style.visibility = "visible";
            helperText.textContent = "*중복된 닉네임 입니다.";
            
        } else {
            helperText.style.visibility = "hidden";
            isCorrectNickname = true;
        
            executeToast();

            await setTimeout(() => {
                const mainForm = document.getElementById("main");
                mainForm.action=`http://localhost:8081/users/${userId}?_method=PATCH`;
                mainForm.submit();
            }, 3000);        

        }
    }


});


async function validateDuplicateNickname(nickname, flag) {
    await fetch(`http://localhost:8081/users/nickname?nickname=${nickname}`)
        .then(isDuplicated => isDuplicated.json())
        .then(isDuplicatedJson => {
            if(isDuplicatedJson.result === "true") {
                flag['flag'] = true;
            }
       });
}



const editCompleteBtn = document.getElementById("edit-complete-btn");

function executeToast() {
    editCompleteBtn.style.marginTop = "5.9vh";
}





const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const modalBack = document.getElementById("modal-back");
    modalBack.style.visibility = "visible";
    

    const modal = document.getElementById("modal");
    modal.style.visibility = "visible";
});


const modalCancel = document.getElementById("modal-cancel");
modalCancel.addEventListener('click', (event) => {
    event.preventDefault()
    const modalBack = document.getElementById("modal-back");
    modalBack.style.visibility = "hidden";
    
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
});

const modalDelete = document.getElementById("modal-delete");
modalDelete.addEventListener('click', (event) => {
    event.preventDefault()
    
    fetch(`http://localhost:8081/users/${userId}`, {method: 'DELETE'});

    alert('회원탈퇴 되었습니다 !');
    window.location.href = '/users/sign-in';
});
