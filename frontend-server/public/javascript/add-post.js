document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    };
}, true);


// 헤더에 이미지 로딩
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


const userId = 1;


// 그리고 패치로 유저 데이터 가져와서 이미지 꺼내서 프로필 사진태그 속성 변경 ㄱㄱ
fetch(`http://localhost:8081/users/${userId}`)
    .then(userData => userData.json())
    .then(userJson => {
            console.log(userJson);
            document.getElementById("profile-img").src = userJson.profileImage;
    })
    



const titleInput = document.getElementById("title-input");

    
titleInput.addEventListener("input", function() {
    const inputText = this.value;
    
    
    if (inputText.length > 26) {
        this.value = inputText.slice(0, 26);
    }
});



const completeBtn = document.getElementById("complete-btn");

titleInput.addEventListener("blur", function(event) { // 제목과 본문 아웃 포커싱할때마다 검증하고 검증된다면 버튼 색 활성화
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

postInput.addEventListener("blur", function(event) {
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


// 버튼 누를 때마다 검증 진행하고 이때 조건 안되면 헬퍼텍스트 노출
completeBtn.addEventListener("click", function() {
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
