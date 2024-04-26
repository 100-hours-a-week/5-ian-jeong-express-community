document.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    };
}, true);


const userId = 1 // 아직 인증, 인가 구현은 안하니까 더미 데이터에 있는 1번 유저를 통해 커뮤니티 구현

document.getElementById('user-edit-btn').addEventListener('click', (event) => {
    window.location.href=`/users/${userId}/edit`;
});

document.getElementById('password-edit-btn').addEventListener('click', (event) => {
    window.location.href=`/users/${userId}/password`;
})



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


// 제목 26여섯글자 제한
const titleInput = document.getElementById("title-input");
titleInput.addEventListener("input", () => {
    const inputText = this.value;
    
    
    if (inputText.length > 26) {
        this.value = inputText.slice(0, 26);
    }
});




// 유저이미지 불러오기


fetch(`http://localhost:8081/users/${userId}`)
    .then(userData => userData.json())
    .then(userJson => {
            document.getElementById("profile-img").src = userJson.profileImage;
    })


const currentUrl = window.location.href;
const urlParams = currentUrl.split('/');
const postId = urlParams[urlParams.length - 2];

// 폼제출하면 posts/1만 나오도록수정해보자
// form에서 patch가 적용이안된다고 하니 다른 방법으로 해보자
document.getElementById('main').addEventListener('submit', (event) => {
    this.action=`http://localhost:8081/posts/${postId}?_method=PATCH`;
});



fetch(`http://localhost:8081/posts/${postId}`)
    .then(postData => postData.json())
    .then(postJson => {
        
        
        let postTitle = document.getElementById("title-input");
        postTitle.value = postJson.title;

        let postText = document.getElementById("post-input");
        postText.value = postJson.content;
                
        let postImage = document.getElementById("image-file");
        postImage.textContent = `기존 이미지 ${postJson.image}`;
        
        let image = document.getElementById("image-selection");
        image.value = postJson.image;
    });


function addImage(event) {
    const file = event.target.files[0]; // 선택한 파일 가져오기
        
    if (file) { // 파일이 있다면
        const reader = new FileReader();
    
        reader.onload = function(e) { // Reader 에 이벤트 핸들러 할당
            document.getElementById("image-selection").value = e.target.result;
        }
        reader.readAsDataURL(file); // 파일을 읽어서 데이터 URL로 변환, 변환 완료 되면 reader가 가진 이벤트 발생 
        
        return;
    } 
    
    document.getElementById("file-input").value = "";
}
    