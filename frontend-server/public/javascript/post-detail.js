BACKEND_IP_PORT = localStorage.getItem('backend-ip-port');


const profileImg = document.getElementById("profile-img");
const dropBox = document.getElementById("drop-down-box");
const userEditBtn = document.getElementById('user-edit-btn');
const passwordEditBtn = document.getElementById('password-edit-btn');

const currentUrl = window.location.href;
const urlParams = currentUrl.split('/');
const postId = parseInt(urlParams[urlParams.length - 1]); 

const postTitle = document.getElementById("post-title");
const postProfileImg = document.getElementById("post-profile-img");
const writer = document.getElementById("writer");
const time = document.getElementById("time");
const postImage = document.getElementById("post-img");
const postText = document.getElementById("post-text");
const hitsNum = document.getElementById("hits-num");
const commentsNum = document.getElementById("comments-num");

const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById("delete-btn"); 

const modalBack = document.getElementById("modal-back");
const modal = document.getElementById("modal");
const modalCancel = document.getElementById("modal-cancel"); 
const modalDelete = document.getElementById("modal-delete"); 

const commentModalCancel = document.getElementById("comment-modal-cancel");
const commentModalDelete = document.getElementById("comment-modal-delete");

const commentInput = document.getElementById("comment-input"); 
const addCommentBtn = document.getElementById("add-comment-btn");




init();



async function init() {
    var userId = 0;
    const result = {
        id: 0
    }

    await getUserIdFromSession(result);
    userId = result.id;

    profileImg.addEventListener("click", () => {
        dropBox.style.visibility = "visible";
    });

    userEditBtn.addEventListener('click', (event) => {
        window.location.href=`/users/${userId}`;
    });

    passwordEditBtn.addEventListener('click', (event) => {
        window.location.href=`/users/${userId}/password`;
    });

    document.addEventListener('click', (event) => { 
        const clickedElement = event.target;
    
        if (clickedElement !== profileImg) {
            dropBox.style.visibility = "hidden";
        }
    });
    
    
    await fetch(`${BACKEND_IP_PORT}/users/${userId}`)
        .then(userData => userData.json())
        .then(userJson => {
            profileImg.src = userJson.profileImage;
        });
    

    editBtn.addEventListener('click', (event) => {
        window.location.href=`/posts/${postId}/edit`;
    });

    deleteBtn.addEventListener('click', (event) => {
        modalBack.style.visibility = "visible";
        modal.style.visibility = "visible";

        document.body.overflow = 'hidden';
    });

    modalCancel.addEventListener('click', (event) => {
        modalBack.style.visibility = "hidden";
        modal.style.visibility = "hidden";

        document.body.style.overflow = "visible";
    });

    modalDelete.addEventListener('click', (event) => {
        fetch(`${BACKEND_IP_PORT}/posts/${postId}`, {method: 'DELETE'});
        alert('해당 게시글이 삭제되었습니다!');

        window.location.href= '/posts'; 
    });



    await fetch(`${BACKEND_IP_PORT}/posts/${postId}`) 
        .then(postData => postData.json()) 
        .then(postJson => {
            postTitle.textContent = postJson.title;
                    
            fetch(`${BACKEND_IP_PORT}/users/${postJson.writer}`) 
                .then(userData => userData.json())
                .then(userJson => {
                    if (parseInt(userId) !== parseInt(userJson.id)) {
                        console.log(userId, userJson.id)
                        editBtn.style.visibility = 'hidden';
                        deleteBtn.style.visibility = 'hidden';
                    }
                    
                    writer.textContent = userJson.nickname;
                    postProfileImg.src = userJson.profileImage;
                });
            
            time.textContent = postJson.time;
            postImage.src = postJson.image;
            postText.textContent = postJson.content;
            hitsNum.textContent = makeShortNumber(parseInt(postJson.hits + 1));
            commentsNum.textContent = makeShortNumber(parseInt(postJson.comments));



            const obj = {
                title: postJson.title,
                content: postJson.content,
                imageName: postJson.imageName,
                image: postJson.image,
                hits: hitsNum.textContent
            }
                
            const data = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }
        
            fetch(`${BACKEND_IP_PORT}/posts/${postId}`, data)
                .then(response => {
                if (response.status === 204) {
                    console.log('조회수 업데이트 성공');
                } else {
                    console.log('조회수 업데이트 실패');
                }
              })
              .catch(error => {
                console.error('fetch error:', error);
              });
        });

        
    commentInput.addEventListener('input', (event) => { 
        const value = event.target.value;

        if(value) {
            addCommentBtn.style.backgroundColor = "#7F6AEE";
            addCommentBtn.disabled = false;
        } else {
            addCommentBtn.style.backgroundColor = "#ACA0EB";
            addCommentBtn.disabled = true;
        }
    });
        






    addCommentBtn.addEventListener('click', async (event) => { 
        if (addCommentBtn.textContent === "댓글 수정") {
            const obj = {
                text : `${commentInput.value}`
            }
        
            const data = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }
        
            await fetch(`${BACKEND_IP_PORT}/posts/${postId}/comments/${addCommentBtn.getAttribute("data-id")}`, data)
            .then(response => {
                if (response.status !== 204) {
                    alert('댓글 수정 실패!');
                }
                    
                    window.location.href= `/posts/${postId}`;
                })
                .catch(error => {
                    console.error('fetch error:', error);
                });

                window.location.href= `/posts/${postId}`;
        
        } else {
            const obj = {
                postId : postId,
                writer : userId,
                text : commentInput.value
            }
        
            const data = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }
        
            await fetch(`${BACKEND_IP_PORT}/posts/${postId}/comments`, data)
                .then(response => {
                if (response.status !== 201) {
                    alert('댓글 작성 실패!');
                }
                    
                window.location.href= `/posts/${postId}`;
                })
                .catch(error => {
                    console.error('fetch error:', error);
                });
            
        }
    });









    await fetch(`${BACKEND_IP_PORT}/posts/${postId}/comments`) 
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
            
            fetch(`${BACKEND_IP_PORT}/users/${comment.writer}`) // 댓글 작성자 데이터 가져오기
                .then(userData => userData.json())
                .then(userJson => {
                    if (parseInt(userJson.id) !== parseInt(userId)) {
                        writerEditBtn.style.visibility = 'hidden';
                        writerDeleteBtn.style.visibility = 'hidden';
                    }

                    writerInfoImg.src = userJson.profileImage;
                    writerInfoIdDiv.textContent = userJson.nickname;
                });
            
            writerInfoDiv.appendChild(writerInfoImg);
            writerInfoDiv.appendChild(writerInfoIdDiv);
            writerInfoDiv.appendChild(writerInfoTimeDiv);
            
            writerInfoBoxDiv.appendChild(writerInfoDiv);
            writerInfoBoxDiv.appendChild(contentInput);
            
            btnInfoDiv.appendChild(writerEditBtn);
            btnInfoDiv.appendChild(writerDeleteBtn);
            
            commentDiv.appendChild(writerInfoBoxDiv);
            commentDiv.appendChild(btnInfoDiv);
            
            
            
            writerEditBtn.addEventListener('click', async () => {  
                addCommentBtn.textContent = "댓글 수정";
                addCommentBtn.setAttribute("data-id", comment.id);
                addCommentBtn.style.backgroundColor = "#7F6AEE";
                addCommentBtn.disabled = false;

                commentInput.value = contentInput.value;
            });
            
            
            writerDeleteBtn.addEventListener('click', () => {
                writerDeleteBtn.addEventListener('click', (event) => {
                    const modalBack = document.getElementById("modal-back");
                    modalBack.style.visibility = "visible";
                    
                    const commentModal = document.getElementById("comment-modal");
                    commentModal.style.visibility = "visible";
                    commentModal.setAttribute("data-id", comment.id);
                    
                    document.body.style.overflow = "hidden";
                });
            });
            
            
            document.body.appendChild(commentDiv);
        })
    });

    const padding = document.createElement('div');
    padding.classList.add('padding');
    document.body.appendChild(padding);
    
    
    
    
    
    commentModalCancel.addEventListener('click', (event) => {
        const modalBack = document.getElementById("modal-back");
        modalBack.style.visibility = "hidden";
        
        const commentModal = document.getElementById("comment-modal");
        commentModal.style.visibility = "hidden";
        document.body.style.overflow = 'visible';
    });
    
    
    commentModalDelete.addEventListener('click', async (event) => { 
        const commentModal = document.getElementById("comment-modal");
        const modalBack = document.getElementById("modal-back");
        
        fetch(`${BACKEND_IP_PORT}/posts/${postId}/comments/${commentModal.getAttribute("data-id")}`, {method: 'DELETE'});
        

        alert('해당 댓글이 삭제되었습니다!');
        modalBack.style.visibility = "hidden";
        commentModal.style.visibility = "hidden";
        document.body.style.overflow = 'visible';
        
        window.location.href= `/posts/${postId}`; 
    });

}




async function getUserIdFromSession(result) {

    await fetch(`${BACKEND_IP_PORT}/users/session`, {credentials: 'include'})
        .then(response => response.json())
        .then(user => {
            if (parseInt(user.id) !== 0) {
                result.id = user.id;
            } else {
                alert('로그아웃 되었습니다 !');
                window.location.href = `/users/sign-in`;
            }
        });
}

function makeShortNumber(number) { 
    if (number >= 1000) {
        return (number / 1000).toFixed(0) + 'K';
                    
    } else {
        return number.toString(); 
    }
}