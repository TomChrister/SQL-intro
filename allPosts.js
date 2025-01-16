// Get all posts
async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:3010/test');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        const container = document.getElementById('post-container');
        data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
        <p>${post.content}</p>
        <p>User ID: ${post.id}</p>
      `;
            container.appendChild(postElement);
        });

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}
fetchPosts();