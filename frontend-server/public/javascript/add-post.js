BACKEND_IP_PORT = localStorage.getItem('backend-ip-port');


document.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    };
}, true);


// 헤더에 이미지 로딩
const profileImg = document.getElementById("profile-img");
profileImg.addEventListener("click", () => {
    const dropBox = document.getElementById("drop-down-box");
    dropBox.style.visibility = "visible";
});

document.addEventListener('click', (event) => {
    const dropBox = document.getElementById("drop-down-box");
    const profileImg = document.getElementById("profile-img");
    const clickedElement = event.target;

    if (clickedElement !== profileImg) {
        dropBox.style.visibility = "hidden";
    }
});

document.getElementById('user-edit-btn').addEventListener('click', (event) => {
    window.location.href=`/users/${userId}`;
});

document.getElementById('password-edit-btn').addEventListener('click', (event) => {
    window.location.href=`/users/${userId}/password`;
});



const userId = 1;


// 그리고 패치로 유저 데이터 가져와서 이미지 꺼내서 프로필 사진태그 속성 변경 ㄱㄱ
fetch(`http://localhost:8081/users/${userId}`)
    .then(userData => userData.json())
    .then(userJson => {
            console.log(userJson);
            document.getElementById("profile-img").src = userJson.profileImage;
    })
    



const titleInput = document.getElementById("title-input");

    
titleInput.addEventListener("input", () => {
    const inputText = this.value;
    
    
    if (inputText.length > 26) {
        this.value = inputText.slice(0, 26);
    }
});



const completeBtn = document.getElementById("complete-btn");

titleInput.addEventListener("blur", (event) => { // 제목과 본문 아웃 포커싱할때마다 검증하고 검증된다면 버튼 색 활성화
    // 제목 내용 검증하고 버튼 색 활성화

    const titleValue = event.target.value;
    const postValue = document.getElementById('post-input').value;

    const helperText = document.getElementById("helper-text");
    

    if (!titleValue || !postValue) {
        helperText.textContent = "*제목, 내용을 모두 작성해주세요.";
        helperText.style.visibility = "visible";
        completeBtn.style.backgroundColor = '#ACA0EB';
    } else {
        helperText.style.visibility = "hidden";
        completeBtn.style.backgroundColor = '#7F6AEE';
    }
    
});



const postInput = document.getElementById("post-input");

postInput.addEventListener("blur", (event) => {
    // 제목 내용 검증하고 버튼 색 활성화

    const postValue = event.target.value;
    const titleValue = document.getElementById('title-input').value;

    const helperText = document.getElementById("helper-text");

    if (!titleValue || !postValue) {
        helperText.textContent = "*제목, 내용을 모두 작성해주세요.";
        helperText.style.visibility = "visible";
        completeBtn.style.backgroundColor = '#ACA0EB';
    } else {
        helperText.style.visibility = "hidden";
        completeBtn.style.backgroundColor = '#7F6AEE';
    }
});


function addImage(event) {
    const file = event.target.files[0]; // 선택한 파일 가져오기
    
    if (file) { // 파일이 있다면
        const reader = new FileReader();

        reader.onload = function(e) { // Reader 에 이벤트 핸들러 할당
            document.getElementById("file-input").value = e.target.result;
        }
        reader.readAsDataURL(file); // 파일을 읽어서 데이터 URL로 변환, 변환 완료 되면 reader가 가진 이벤트 발생 
    
        return;
    } 

    document.getElementById("file-input").value = "";
}









// 버튼 누를 때마다 검증 진행하고 이때 조건 안되면 헬퍼텍스트 노출
completeBtn.addEventListener("click", () => {
    // 둘 다 검증하고 안되면 헬퍼텍스트 노출
    const titleValue = document.getElementById('title-input').value;
    const postValue = document.getElementById('post-input').value;
    const helperText = document.getElementById("helper-text");

    if (!titleValue || !postValue) {
        helperText.textContent = "*제목, 내용을 모두 작성해주세요.";
        helperText.style.visibility = "visible";
        completeBtn.style.backgroundColor = '#ACA0EB';
        event.preventDefault(); // form 내에서 버튼 클릭 시 리로딩 되니까 헬퍼 텍스트 변경사항이 유지하기 위해

    } else { // 검증 완료 
        alert("게시글 등록완료");
    }
});
