const userId = 1;

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    };
}, true);


const profileImg = document.getElementById("profile-img");
profileImg.addEventListener("click", function() {
    const dropBox = document.getElementById("drop-down-box");
    dropBox.style.visibility = "visible";
});

document.addEventListener('click', function(event) {
    const dropBox = document.getElementById("drop-down-box");
    const profileImg = document.getElementById("profile-img");
    const clickedElement = event.target;

    if (clickedElement !== profileImg) {
        dropBox.style.visibility = "hidden";
    }
});

document.getElementById('user-edit-btn').addEventListener('click', function(event) {
    window.location.href=`/users/${userId}`;
});

document.getElementById('password-edit-btn').addEventListener('click', function(event) {
    window.location.href=`/users/${userId}/password`;
});




fetch(`http://localhost:8081/users/${userId}`)
    .then(userData => userData.json())
    .then(userJson => {
            document.getElementById("profile-img").src = userJson.profileImage;
    });


// 비밀번호 유효성 검사

// 입력안했을 시
// 8자이상 20자 이하 대소수특 1개 이상
// 비밀번호 확인과 다를 시

// 비밀번호 확인
// 입력안했을 시
// 비밀번호와 다를 시 

const passwordInput = document.getElementById("input-password");
const rePasswordInput = document.getElementById("input-password-double");

const editBtn = document.getElementById("edit-btn");

var isCorrentPassword = false;
passwordInput.addEventListener("blur", function(event) {
    let value = event.target.value;
    let passwordHelper = document.getElementById("password-helper-text");
    let rePasswordHelper = document.getElementById("re-password-helper-text");

    if (!value) { // 입력이 없다면
        passwordHelper.style.visibility = "visible";
        passwordHelper.textContent = "*비밀번호를 입력해주세요";
        editBtn.style.backgroundColor = "#ACA0EB";
        isCorrentPassword = false;

    } else if(!validatePasswordFormat(value)) { // 포맷이 안맞는다면
        passwordHelper.style.visibility = "visible";
        passwordHelper.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포합해야 합니다.";
        editBtn.style.backgroundColor = "#ACA0EB";
        isCorrentPassword = false;

    } else if(!validatePasswordDouble()) { // 두 개 값이 다르다면 
        passwordHelper.style.visibility = "visible";
        passwordHelper.textContent = "*비밀번호 확인과 다릅니다.";
        editBtn.style.backgroundColor = "#ACA0EB";
        isCorrentPassword = false;

    } else {
        passwordHelper.style.visibility = "hidden";
        rePasswordHelper.style.visibility = "hidden";
        editBtn.style.backgroundColor = "#7F6AEE";
        isCorrentPassword = true;
        isCorrentRePassword = true;
    }
});


// 비밀번호 확인 검증
var isCorrentRePassword = false;
rePasswordInput.addEventListener("blur", function(event) {
    let value = event.target.value;
    let passwordHelper = document.getElementById("password-helper-text");
    let rePasswordHelper = document.getElementById("re-password-helper-text");

    if (!value) { // 입력이 없다면
        rePasswordHelper.style.visibility = "visible";
        rePasswordHelper.textContent = "*비밀번호를 한번 더 입력해주세요";
        editBtn.style.backgroundColor = "#ACA0EB";
        isCorrentRePassword = false;

    } else if(!validatePasswordFormat(value)) { // 포맷이 안맞는다면
        rePasswordHelper.style.visibility = "visible";
        rePasswordHelper.textContent = "*비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포합해야 합니다.";
        editBtn.style.backgroundColor = "#ACA0EB"; 
        isCorrentRePassword = false;

    } else if(!validatePasswordDouble()) { // 확인체크 
        rePasswordHelper.style.visibility = "visible";
        rePasswordHelper.textContent = "*비밀번호가 다릅니다.";
        editBtn.style.backgroundColor = "#ACA0EB";
        isCorrentRePassword = false;

    } else {
        passwordHelper.style.visibility = "hidden";
        rePasswordHelper.style.visibility = "hidden";
        editBtn.style.backgroundColor = "#7F6AEE";
        isCorrentPassword = true;
        isCorrentRePassword = true;
    }
});


function validatePasswordFormat(password) {
    const passwordRegax = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
    return passwordRegax.test(password);

}

function validatePasswordDouble() {
    const password = document.getElementById("input-password").value;
    const rePassowrd = document.getElementById("input-password-double").value;

    return password === rePassowrd;
}

editBtn.addEventListener('click', async function(event) {
    event.preventDefault(); // form 내에서 버튼 클릭 시 리로딩 되니까 헬퍼 텍스트 변경사항이 유지하기 위해

    console.log(isCorrentPassword, isCorrentRePassword);
    if (isCorrentPassword && isCorrentRePassword) {
        executeToast();
    
        await setTimeout(() => {
            const mainForm = document.getElementById("main");
            mainForm.action=`http://localhost:8081/users/${userId}/password?_method=PATCH`;
            mainForm.submit();
        }, 3000);
    }

});




const editCompleteBtn = document.getElementById("edit-complete-btn");
function executeToast() {
    editCompleteBtn.style.marginTop = "5.9vh";
}

