document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('postContent').value;
    
    await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });
    
    document.getElementById('postContent').value = '';
    loadPosts();
});

async function loadPosts() {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <p>${post.content}</p>
            <button onclick="likePost(${post.id})">Like</button>
            <div class="comments"></div>
            <input type="text" placeholder="Add a comment" onchange="addComment(${post.id}, this.value)">
        `;
        postsContainer.appendChild(postElement);
    });
}

async function likePost(postId) {
    await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
    loadPosts();
}

async function addComment(postId, comment) {
    await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment })
    });
    loadPosts();
}

window.onload = loadPosts;
