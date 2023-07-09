import requests
from bs4 import BeautifulSoup

# Define the URL of the job board website
url = "https://www.examplejobboard.com"

# Make a GET request to the job board website
response = requests.get(url)

# Parse the HTML content of the response using BeautifulSoup
soup = BeautifulSoup(response.content, "html.parser")

# Find and extract the job listings on the page
job_listings = soup.find_all("div", class_="job-listing")

# Process and extract information from each job listing
for job in job_listings:
    title = job.find("h2").text.strip()
    company = job.find("span", class_="company").text.strip()
    location = job.find("span", class_="location").text.strip()
    description = job.find("div", class_="description").text.strip()
    
    # Perform further processing or store the extracted data
    
    # Print the extracted information as an example
    print("Title:", title)
    print("Company:", company)
    print("Location:", location)
    print("Description:", description)
    print("--------------------")
