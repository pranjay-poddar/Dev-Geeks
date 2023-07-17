# News Reader

This script retrieves the top headlines from the News API and uses text-to-speech to read them aloud.

## Prerequisites

- Python 3.6 or above
- Requests library: `pip install requests`
- `win32com.client` library for Windows: `pip install pywin32`

## Setup

1. Obtain an API key from the [News API](https://newsapi.org/) website.
2. Clone or download this repository to your local machine.
3. Install the required dependencies using the commands mentioned in the "Prerequisites" section.

## Usage

1. Open the `main.py` file in a text editor.
2. Replace the placeholder API key with your valid News API key in the API request URL .
3. Save the changes to the `main.py` file.
4. Open a terminal or command prompt and navigate to the directory where the `main.py` file is located.
5. Run the script using the command: `python main.py`.
6. The script will retrieve the top headlines and read them aloud using the default text-to-speech voice on your Windows machine.

Note: The script is currently set to retrieve the top headlines for India. If you want to retrieve headlines for a different country or from a different news source, you can modify the API request URL accordingly.


