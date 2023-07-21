import requests

# Define the GitHub repository details
username = "your_username"
repository = "your_repository"

# Define the API endpoint URL
url = f"https://api.github.com/repos/{username}/{repository}"

# Make a GET request to the API endpoint
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Access the JSON data from the response
    data = response.json()

    # Extract and print relevant information from the repository
    repo_name = data["name"]
    repo_description = data["description"]
    repo_stars = data["stargazers_count"]
    repo_forks = data["forks_count"]
    
    print(f"Repository: {repo_name}")
    print(f"Description: {repo_description}")
    print(f"Stars: {repo_stars}")
    print(f"Forks: {repo_forks}")

else:
    print("Failed to retrieve repository data from GitHub API")
