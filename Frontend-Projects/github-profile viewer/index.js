
const form = document.getElementById('search-form');
const userDetails = document.getElementById('user-details');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    fetchUserData(username);
});

function fetchUserData(username) {
    const apiUrl = `https://api.github.com/users/${username}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayUserDetails(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayUserDetails(user) {
    userDetails.innerHTML = `
    <div class="name">
    <img src="${user.avatar_url}" alt="Profile Picture">
        <h2>${user.name}</h2>
        <a href="${user.html_url}" target="_blank">Visit Profile</a>
        </div>
        <div class="bio">
        <p>${user.bio}</p>
        <p>Repositories: ${user.public_repos}</p>
        </div>
        <div class="follow"
        <p>Followers: ${user.followers}</p>
        <p>Following: ${user.following}</p>
        </div>
    `;
}
