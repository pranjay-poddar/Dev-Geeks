// Main variables
let theInput = document.querySelector('.get-repos input');
let getButton = document.querySelector('.get-button');
let reposData = document.querySelector('.show-data');

// Global array to store the data of all repositories
var repositories = [];

// Get Repos buttons functioning
getButton.onclick = function () {
    getRepos();
};

// Enter button functioning
document.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        getRepos();
    }
});

// Get Repos function
function getRepos() {
    if (theInput.value === "") {
        reposData.innerHTML = "<span>Please Write Github Username.</span>";
    } else {
        fetchAllRepos();
    }
}

// Function to fetch all repositories
async function fetchAllRepos() {
    repositories = [];

    let page = 1;
    let url = `https://api.github.com/users/${theInput.value}/repos?per_page=100&page=${page}`;

    while (url) {
        const response = await fetch(url);
        const data = await response.json();
        repositories = repositories.concat(data);

        const linkHeader = response.headers.get('Link');
        const nextPageUrl = extractNextPageUrl(linkHeader);
        url = nextPageUrl;
    }

    if(repositories.length === 0) {
        reposData.innerHTML = "<span>No Data Found !</span>";
    } else {
        showRepos();
    }
}

// Function to extract the URL of the next page from the Link header
function extractNextPageUrl(linkHeader) {
    if (!linkHeader) return null;

    const links = linkHeader.split(',');
    const nextLink = links.find(link => link.includes('rel="next"'));
    if (!nextLink) return null;

    const nextUrl = nextLink.match(/<([^>]+)>/)[1];
    return nextUrl;
}

// Function to display the repositories
function showRepos() {
    // Empty the container
    reposData.innerHTML = '';
    
    // Loop through the repositories
    repositories.forEach(repo => {
        // Create the main div element
        let mainDiv = document.createElement('div');

        mainDiv.classList = 'repo-box';

        // Create repository name text
        let repoName = document.createTextNode(repo.name);

        // Append the text to the main div
        mainDiv.appendChild(repoName);

        // Create repository URL anchor
        let theUrl = document.createElement('a');

        // Create repository URL text
        let theUrlText = document.createTextNode('Visit');

        // Append the repository URL text to the anchor tag
        theUrl.appendChild(theUrlText);

        // Add the hypertext reference 'href'
        theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

        // Set attribute blank
        theUrl.setAttribute('target', '_blank');

        // Append URL anchor to the main div
        mainDiv.appendChild(theUrl);

        // Create stars count span
        let StarsSpan = document.createElement('span');

        // Create the stars count text
        let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

        // Add stars count text to stars span
        StarsSpan.appendChild(starsText);

        // Append stars count span to the main div
        mainDiv.appendChild(StarsSpan);

        // Append the main div to the container
        reposData.appendChild(mainDiv);
    })
}
