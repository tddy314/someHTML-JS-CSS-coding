
async function fetchPro5() {
    const user = document.getElementById('username').value;
    const err = document.getElementById('error');
    const pro5 = document.getElementById('profile');

    err.innerHTML = '';
    pro5.innerHTML = '';

    if(user === '') {
        err.innerHTML = 'Please enter a Github username!';
        return;
    }
    try {
        const res = await fetch(`https://api.github.com/users/${user}`);
        if (!res.ok) {
            throw new Error('User not found');
        }
        const data = await res.json();
        pro5.innerHTML = `
            <img src="${data.avatar_url}" alt="Avatar" width="100" height="100">
            <h3>${data.name ? data.name : 'No Name Provided'}</h3>
            <p><strong>Username:</strong> ${data.login}</p>
            <p><strong>Followers:</strong> ${data.followers}</p>
            <p><strong>Following:</strong> ${data.following}</p>
            <p><strong>Public Repos:</strong> ${data.public_repos}</p>
            <p><a href="${data.html_url}" target="_blank">View Profile on GitHub</a></p>
        `;
    } catch(error) {
        err.innerHTML = 'Error :' + error.message;
    }
}

