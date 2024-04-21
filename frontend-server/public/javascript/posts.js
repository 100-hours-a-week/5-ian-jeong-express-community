const userId = 1 // 아직 인증, 인가 구현은 안하니까 더미 데이터에 있는 1번 유저를 통해 커뮤니티 구현

document.getElementById('user-edit-btn').addEventListener('click', function(event) {
    window.location.href=`/users/${userId}/edit`;
});

document.getElementById('password-edit-btn').addEventListener('click', function(event) {
    window.location.href=`/users/${userId}/password`;
})



// 프로필 드롭다운 박스 
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




// 그리고 패치로 유저 데이터 가져와서 이미지 꺼내서 프로필 사진태그 속성 변경 ㄱㄱ
fetch(`http://localhost:8081/users/${userId}`) // 패치로 유저 아이디에 해당하는 유저 데이터를 제이슨으로 받아와서 세팅
    .then(userData => userData.json())
    .then(userJson => {
        console.log(userJson);
        document.getElementById("profile-img").src = userJson.profileImage;
    })





// 게시글 제이슨 가져와서 리스트 만들기 ㄱㄱ
fetch('localhost:backend-port/posts')
    .then(postsData => postsData.json())
    .then(postsJson => {
        const postIds = Object.keys([postsJson]);
        postIds.forEach(postId => {
            const post = postsJson[postId];

            const postBox = document.createElement('div');
            postBox.classList.add('post-box');
            
            const upPost = document.createElement('div');
            upPost.classList.add('up-post');
            
            const postTitle = document.createElement('div');
            postTitle.classList.add('post-title');
            
            const postLogBox = document.createElement('div');
            postLogBox.classList.add('post-log-box');
            
            const like = document.createElement('div');
            like.classList.add('like');

            const comment = document.createElement('div');
            comment.classList.add('comment');

            const hits = document.createElement('div');
            hits.classList.add('hits');

            const time = document.createElement('div');
            time.classList.add('time');

            const line = document.createElement('hr');
            line.classList.add('line1');

            const downPost = document.createElement('div');
            downPost.classList.add('down-post');

            const profileImage = document.createElement('img');
            profileImage.classList.add('profile-image');

            const writer = document.createElement('div');
            writer.classList.add('writer');

            postBox.id = postId;

            // 타이틀 검사 진행
            if (post.title.length > 25) {
                postTitle.textContent = post.title.slice(0, 26) + "...";
            } else {
                postTitle.textContent = post.title;
            }

            // 1,000이상일 때 1K,  10,000d이상일 때 10K, 100,000이상일 때 100K로 입력
            like.textContent = `좋아요 ${makeShortNumber(post.likes)}`;
            comment.textContent = `댓글 ${makeShortNumber(post.comments)}`;
            hits.textContent = `조회수 ${makeShortNumber(post.hits)}`;

            time.textContent = post.time;
            

            fetch(`/users/${post.userId}}`) // 해당 게시물 작성한 유저 아이디 찾아야 프로필 찾기 가능, 결과는 해당 유저반환 
                .then(userData => userData.json())
                .then(userJson => {
                        profileImage.src = userJson.image;
                        writer.textContent = userJson.nickname;
                    })

            
            postLogBox.appendChild(like);
            postLogBox.appendChild(comment);
            postLogBox.appendChild(hits);
            postLogBox.appendChild(time);
            
            upPost.appendChild(postTitle);
            upPost.appendChild(postLogBox);
    
            downPost.appendChild(profileImage);
            downPost.appendChild(writer);
            
            postBox.appendChild(postId);
            postBox.appendChild(upPost);
            postBox.appendChild(line);
            postBox.appendChild(downPost);
            
            document.body.appendChild(postBox);

            postBox.addEventListener('click', function() {
                window.location.href = `/posts/${postBox.id}`;
            });
        })
    });


function makeShortNumber(number) {
    if (number >= 1000) {
        return (number / 1000).toFixed(0) + 'K';
            
    } else {
        return number.toString(); // 그대로 반환
    }
}