BACKEND_IP_PORT = localStorage.getItem('backend-ip-port');

const userId = getUserIdFromCookie();

const userEditBtn = document.getElementById('user-edit-btn');
const passwordEditBtn = document.getElementById('password-edit-btn');

const profileImg = document.getElementById("profile-img");
const dropBox = document.getElementById("drop-down-box");



userEditBtn.addEventListener('click', (event) => {
    window.location.href=`/users/${userId}`;
});

passwordEditBtn.addEventListener('click', (event) => {
    window.location.href=`/users/${userId}/password`;
});

profileImg.addEventListener("click", () => {
    
    dropBox.style.visibility = "visible";
});

document.addEventListener('click', (event) => {
    const clickedElement = event.target;

    if (clickedElement !== profileImg) {
        dropBox.style.visibility = "hidden";
    }
});



fetch(`${BACKEND_IP_PORT}/users/${userId}`) 
    .then(userData => userData.json())
    .then(userJson => {
        profileImg.src = userJson.profileImage;
    });

fetch(`${BACKEND_IP_PORT}/posts`)
    .then(postsData => postsData.json())
    .then(postsJson => {
        postsJson.forEach(post => {
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

            postBox.id = post.id;

            if (post.title.length > 26) {
                postTitle.textContent = post.title.slice(0, 27) + "...";
            } else {
                postTitle.textContent = post.title;
            }

            like.textContent = `좋아요 ${makeShortNumber(post.likes)}`;
            comment.textContent = `댓글 ${makeShortNumber(post.comments)}`;
            hits.textContent = `조회수 ${makeShortNumber(post.hits)}`;

            time.textContent = post.time;
            
            fetch(`${BACKEND_IP_PORT}/users/${post.writer}}`)
                .then(userData => userData.json())
                .then(userJson => {
                        profileImage.src = userJson.profileImage;
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
            
            postBox.appendChild(upPost);
            postBox.appendChild(line);
            postBox.appendChild(downPost);
            
            document.body.appendChild(postBox);

            postBox.addEventListener('click', () => {
                window.location.href = `/posts/${postBox.id}`;
            });
        });
    });


function makeShortNumber(number) {
    if (number >= 1000) {
        return (number / 1000).toFixed(0) + 'K';
            
    } else {
        return number.toString();
    }
}


function getUserIdFromCookie() {
    const cookieArray = document.cookie.split(';');

    for (let cookie of cookieArray) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
            
        if (cookieName === 'userId') {
            return decodeURIComponent(cookieValue);
        }
    
        return null;
    }
}
