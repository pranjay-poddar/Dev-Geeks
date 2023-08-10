import pandas as pd
import requests
from bs4 import BeautifulSoup
from datetime import date


class CovidInfo:
    """
    Create an instance of the `CovidInfo` class\n
    ```python
    response = CovidInfo()
    ```
    Class - `CovidInfo`\n
    | Methods | Details |
    | --------------------------- | ---------------------------------------------------------------------------------------------------- |
    | `.covid_data()` | Returns the list of all the covid data scraped from the website |
    | `.total_cases()` | Returns the count of total covid cases all over the world |
    | `.total_deaths()` | Returns the count of deaths covid cases all over the world |
    | `.total_recovered()` | Returns the count of recovered covid cases all over the world |
    | `.latest_news()` | Return the lastest news of the day |
    """

    def __init__(self):
        pass

    def covid_data(self):
        """
        Class - `CovidInfo`\n
        ```python
        response = CovidInfo()
        response.covid_data()
        ```
        Returns\n
        ```js
        {'Country': 'United States', 'Number of Cases': 107365548, 'Deaths': 1168558, 'Continent': 'North America'}
        ```
        """

        url = "https://www.worldometers.info/coronavirus/countries-where-coronavirus-has-spread/"
        page = requests.get(url)
        soup = BeautifulSoup(page.text, "html.parser")
        keys_data = ["Country", "Number of Cases", "Deaths", "Continent"]
        response_data = []
        data_iterator = iter(soup.find_all("td"))
        while True:
            try:
                country = next(data_iterator).text
                confirmed = str(
                    next(data_iterator).text.replace(",", "").replace(" ", "")
                )
                deaths = str(next(data_iterator).text.replace(",", "").replace(" ", ""))
                continent = next(data_iterator).text

                values_data = [country, int(confirmed), int(deaths), continent]
                zipped_data = dict(zip(keys_data, values_data))
                response_data.append(zipped_data)

            except StopIteration:
                break
        if len(response_data) == 1:
            return None
        else:
            return response_data

    def total_cases(self):
        """
        Get the total number of COVID cases in the world\n
        Class - `CovidInfo`\n
        ```python
        response = CovidInfo()
        response.total_cases()
        ```
        """
        try:
            url = "https://www.worldometers.info/coronavirus/countries-where-coronavirus-has-spread/"
            page = requests.get(url)
            soup = BeautifulSoup(page.text, "html.parser")
            req = soup.find_all("span", {"class": "bold_number"})

            z = req[0].find_all("a")
            fin = ""
            for i in z:
                fin = fin + i.contents[0]
            sol = fin.split(" ")
            return sol[0]
        except:
            return None

    def total_deaths(self):
        """
        Get the total number of COVID-deaths in the world\n
        Class - `CovidInfo`\n
        ```python
        response = CovidInfo()
        response.total_cases()
        ```
        """
        try:
            url = "https://www.worldometers.info/coronavirus/countries-where-coronavirus-has-spread/"
            page = requests.get(url)
            soup = BeautifulSoup(page.text, "html.parser")
            req = soup.find_all("a", {"href": "/coronavirus/coronavirus-death-toll/"})
            k = req[0].find("strong").contents[0].split(" ")
            return k[0]
        except:
            return None

    def total_recovered(self):
        """
        Get the total number of COVID-recovered in the world\n
        Class - `CovidInfo`\n
        ```python
        response = CovidInfo()
        response.total_recovered()
        ```
        """
        try:
            url = "https://www.worldometers.info/coronavirus/"
            page = requests.get(url)
            soup = BeautifulSoup(page.text, "html.parser")
            req = soup.find_all("div", {"id": "maincounter-wrap"})
            recovered_count = req[-1].find("span").text.strip()
            return {"recovered": recovered_count}
        except:
            return None

    def latest_news(self):
        """
        Get the latest news from all over the world\n
        Class - `CovidInfo`\n
        ```python
        response = CovidInfo()
        response.latest_news()
        ```
        Return\n
        ```js
        [
            {
                "news":"10 new cases in Denmark\\xa0[source]",
                "source":"https://www.worldometers.info/coronavirus/country/denmark/"
            }
            ...
        ]
        ```
        """
        try:
            url = "https://www.worldometers.info/coronavirus/"
            page = requests.get(url)
            news_data = []
            soup = BeautifulSoup(page.text, "html.parser")
            news_block = soup.find("div", {"id": "news_block"})
            date_ = date.today()
            id = "newsdate" + str(date_)
            news_s = news_block.find("div", {"id": id})
            news = news_s.find_all("div", {"class": "news_post"})
            for news_ in news:
                news_text = news_.text.strip()
                news_source = "https://www.worldometers.info" + news_.find("a")["href"]
                data = {"news": news_text, "source": news_source}
                news_data.append(data)
            return news_data
        except:
            return None


#cov = CovidInfo()
#print(cov.latest_news())
