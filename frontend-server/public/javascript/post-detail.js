document.addEventListener('keydown', function(event) { // 엔터키 폼 전송 방지
    if (event.keyCode === 13) {
      event.preventDefault();
    };
}, true);

const userId = 1 // 아직 인증, 인가 구현은 안하니까 더미 데이터에 있는 1번 유저를 통해 커뮤니티 구현

document.getElementById('user-edit-btn').addEventListener('click', function(event) {
    window.location.href=`/users/${userId}/edit`;
});

document.getElementById('password-edit-btn').addEventListener('click', function(event) {
    window.location.href=`/users/${userId}/password`;
})



const profileImg = document.getElementById("profile-img"); // 프로필 이미지 클릭 시 드롭 박스 노출
profileImg.addEventListener("click", function() {
    const dropBox = document.getElementById("drop-down-box");
    dropBox.style.visibility = "visible";
});



document.addEventListener('click', function(event) { // 드롭 박스 히든
    const dropBox = document.getElementById("drop-down-box");
    const profileImg = document.getElementById("profile-img");
    const clickedElement = event.target;

    if (clickedElement !== profileImg) {
        dropBox.style.visibility = "hidden";
    }
});




document.getElementById('user-edit-btn').addEventListener('click', function(event) {
    window.location.href=`/users/${userId}/edit`;
});

document.getElementById('password-edit-btn').addEventListener('click', function(event) {
    window.location.href=`/users/${userId}/password`;
})



fetch(`http://localhost:8081/users/${userId}`)
    .then(userData => userData.json())
    .then(userJson => {
            document.getElementById("profile-img").src = userJson.profileImage;
    })



const deleteBtn = document.getElementById("delete-btn"); // 게시글 삭제 버튼 이벤트
deleteBtn.addEventListener('click', function(event) {
    const modalBack = document.getElementById("modal-back");
    modalBack.style.visibility = "visible";
    

    const modal = document.getElementById("modal");
    modal.style.visibility = "visible";

    document.body.overflow = 'hidden';
});

const modalCancel = document.getElementById("modal-cancel"); // 게시글 삭제 모달 창에서 취소 이벤트 
modalCancel.addEventListener('click', function(event) {
    const modalBack = document.getElementById("modal-back");
    modalBack.style.visibility = "hidden";
    
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";

    
    document.body.style.overflow = "visible";
});

var currentUrl = window.location.href;
var urlParams = currentUrl.split('/');
const postId = urlParams[urlParams.length - 1]; 

document.getElementById('edit-btn').addEventListener('click', function(event) {
    window.location.href=`/posts/${postId}/edit`;
})


const modalDelete = document.getElementById("modal-delete"); // 게시글 삭제 모달 창에서 삭제 이벤트






modalDelete.addEventListener('click', function(event) {
    fetch(`http://localhost:8081/posts/${postId}`, {method: 'DELETE'});
    alert('해당 게시글이 삭제되었습니다!');

    window.location.href= '/posts';
});









fetch(`http://localhost:8081/posts/${postId}`) // 해당 포스트 데이터 세팅
    .then(postData => postData.json()) 
    .then(postJson => {
            let postTitle = document.getElementById("post-title");
            postTitle.textContent = postJson.title;
                
            
            fetch(`http://localhost:8081/users/${postJson.writer}`)
            .then(userData => userData.json())
            .then(userJson => {
                    let writer = document.getElementById("writer");
                    writer.textContent = userJson.nickname;

                    let postProfileImg = document.getElementById("post-profile-img");
                    postProfileImg.src = userJson.profileImage;
                })
            


            let time = document.getElementById("time");
            time.textContent = postJson.time;

            let postImage = document.getElementById("post-img");
            postImage.src = postJson.image;

            let postText = document.getElementById("post-text");
            postText.textContent = postJson.content;

            let hitsNum = document.getElementById("hits-num");
            hitsNum.textContent = makeShortNumber(parseInt(postJson.hits));

            let commentsNum = document.getElementById("comments-num");
            commentsNum.textContent = makeShortNumber(parseInt(postJson.comments));

            });
              
    






function makeShortNumber(number) { // 조회수와 댓글 천 단위 넘어가면 K 붙임
    if (number >= 1000) {
        return (number / 1000).toFixed(0) + 'K';
                
    } else {
        return number.toString(); // 그대로 반환
    }
}




const commentInput = document.getElementById("comment-input"); 
commentInput.addEventListener('input', function(event) { // 댓글입력창 이벤트
    const value = event.target.value;

    if(value) {
        const addCommentBtn = document.getElementById("add-comment-btn");
        addCommentBtn.style.backgroundColor = "#7F6AEE";
        addCommentBtn.disabled = true;
    } else {
        const addCommentBtn = document.getElementById("add-comment-btn");
        addCommentBtn.style.backgroundColor = "#ACA0EB";
        addCommentBtn.disabled = false;
    }
})




// document.querySelectorAll('.writer-edit-btn').forEach(button => {
//     button.addEventListener('click', function() {
//         var comment = this.closest('.comment'); // 클릭된 버튼의 부모 요소인 댓글 요소를 찾음
//         var contentInput = comment.querySelector('.content-info'); // 해당 댓글 내용 입력 필드를 찾음
//         // contentInput을 통해 댓글 내용 수정 가능
//         contentInput.readOnly = false;
//         contentInput.style.border = "1px solid rgba(0,0,0,0.5)";

//         contentInput.addEventListener("blur", function(event) {
//             contentInput.readOnly = true;
//             contentInput.style.border = "none";
//         })
//     });
// });


// document.querySelectorAll('.writer-delete-btn').forEach(button => {
//     button.addEventListener('click', function() {
//         var comment = this.closest('.comment'); // 클릭된 버튼의 부모 요소인 댓글 요소를 찾음
//         var commentDeleteBtn = comment.querySelector('.writer-delete-btn'); // 해당 댓글 내용 입력 필드를 찾음
        
//         commentDeleteBtn.addEventListener('click', function(event) {
//             const modalBack = document.getElementById("modal-back");
//             // modalBack.style.visibility = "visible";
    

//             const commentModal = document.getElementById("comment-modal");
//             // commentModal.style.visibility = "visible";
//         });
//     });
// });





const commentModalCancel = document.getElementById("comment-modal-cancel");
commentModalCancel.addEventListener('click', function(event) { // 댓글 삭제 모달 창 내에서 취소
    const modalBack = document.getElementById("modal-back");
    modalBack.style.visibility = "hidden";
    
    const commentModal = document.getElementById("comment-modal");
    commentModal.style.visibility = "hidden";

    document.body.style.overflow = 'visible';
});

const commentModalDelete = document.getElementById("comment-modal-delete");
commentModalDelete.addEventListener('click', function(event) { // 댓글 삭제 모달 창 내에서 삭제 

    // 게시글 삭제하고 알림창 띄우고 post로 이동
    alert('해당 댓글이 삭제되었습니다!');
    const modalBack = document.getElementById("modal-back");
    modalBack.style.visibility = "hidden";
    
    const commentModal = document.getElementById("comment-modal");
    commentModal.style.visibility = "hidden";
    document.body.style.overflow = 'visible';
});




fetch(`http://localhost:8081/posts/${postId}/comments`) // 댓글 가져오기
    .then(commentsData => commentsData.json())
    .then(commentsJson => {
        commentsJson.forEach(comment => {
            
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.id = comment.id;

            const writerInfoBoxDiv = document.createElement('div');
            writerInfoBoxDiv.classList.add('writer-info-box');

            const writerInfoDiv = document.createElement('div');
            writerInfoDiv.classList.add('writer-info');

            const writerInfoImg = document.createElement('img');
            writerInfoImg.classList.add('writer-info-img');
                

            const writerInfoIdDiv = document.createElement('div');
            writerInfoIdDiv.classList.add('writer-info-id');

            fetch(`http://localhost:8081/users/${comment.writer}`)
                .then(userData => userData.json())
                .then(userJson => {
                    writerInfoImg.src = userJson.profileImage;

                    writerInfoIdDiv.textContent = userJson.nickname;
                });



            const writerInfoTimeDiv = document.createElement('div');
            writerInfoTimeDiv.classList.add('writer-info-time');
            writerInfoTimeDiv.textContent = comment.time;

            const contentInput = document.createElement('input');
            contentInput.classList.add('content-info');
            contentInput.type = 'text';
            contentInput.value = comment.text;
            contentInput.readOnly = true;

            const btnInfoDiv = document.createElement('div');
            btnInfoDiv.classList.add('btn-info');

            const writerEditBtn = document.createElement('button');
            writerEditBtn.classList.add('writer-edit-btn');
            writerEditBtn.textContent = '수정';

            const writerDeleteBtn = document.createElement('button');
            writerDeleteBtn.classList.add('writer-delete-btn');
            writerDeleteBtn.textContent = '삭제';

            // 요소들을 조립하여 추가
            writerInfoDiv.appendChild(writerInfoImg);
            writerInfoDiv.appendChild(writerInfoIdDiv);
            writerInfoDiv.appendChild(writerInfoTimeDiv);

            writerInfoBoxDiv.appendChild(writerInfoDiv);
            writerInfoBoxDiv.appendChild(contentInput);

            btnInfoDiv.appendChild(writerEditBtn);
            btnInfoDiv.appendChild(writerDeleteBtn);

            commentDiv.appendChild(writerInfoBoxDiv);
            commentDiv.appendChild(btnInfoDiv);

            writerEditBtn.addEventListener('click', function() { 
                var comment = this.closest('.comment'); // 클릭된 버튼의 부모 요소인 댓글 요소를 찾음
                var contentInput = comment.querySelector('.content-info'); // 해당 댓글 내용 입력 필드를 찾음
                        
                contentInput.readOnly = false; // contentInput을 통해 댓글 내용 수정 가능
                contentInput.style.border = "1px solid rgba(0,0,0,0.5)";

                
                contentInput.addEventListener("blur", function(event) {
                    contentInput.readOnly = true;
                    contentInput.style.border = "none";
                })
            });
                
                
            writerDeleteBtn.addEventListener('click', function() {
                var comment = this.closest('.comment'); // 클릭된 버튼의 부모 요소인 댓글 요소를 찾음
                var commentDeleteBtn = comment.querySelector('.writer-delete-btn'); // 해당 댓글 내용 입력 필드를 찾음
                                
                commentDeleteBtn.addEventListener('click', function(event) {
                    const modalBack = document.getElementById("modal-back");
                    modalBack.style.visibility = "visible";
                        
                
                    const commentModal = document.getElementById("comment-modal");
                    commentModal.style.visibility = "visible";

                    document.body.style.overflow = "hidden";
                });
            });
                
                
            
            
            

            document.body.appendChild(commentDiv);
                
            const padding = document.createElement('div');
            padding.classList.add('padding');
            document.body.appendChild(padding);
        })
    });
