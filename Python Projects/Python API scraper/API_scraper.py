import requests

# Define the API endpoint URL
url = "https://api.example.com/data"

# Make a GET request to the API endpoint
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Access the JSON data from the response
    data = response.json()

    # Process and extract the desired information from the data
    for item in data:
        # Extract specific fields from each item
        field1 = item["field1"]
        field2 = item["field2"]
        
        # Perform further processing or store the extracted data
        
        # Print the extracted fields as an example
        print(f"Field 1: {field1}")
        print(f"Field 2: {field2}")

else:
    print("Failed to retrieve data from the API")
