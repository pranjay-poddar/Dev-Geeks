import requests
from bs4 import BeautifulSoup
import json


class EazyDiner:
    """
    Create an instance of `EazyDiner` class.\n
    ```python
    restaurants = EazyDiner(location="city-name")
    ```
    | Methods             | Details                                                                               |
    | ------------------- | ------------------------------------------------------------------------------------- |
    | `.get_restaurants()` | Returns the restaurants name, location, rating, cuisine and prices in JSON format.  |
    """

    def __init__(self, location):
        self.location = location

    def get_restaurants(self):
        """
        Class - `EazyDiner`
        Example:
        ```
        del = EazyDiner("Delhi NCR") or del = EazyDiner("delhi-ncr")
        del.getRestaurants()
        ```
        Returns:
        {
            "restaurant": restaurant name
            "location": location of restaurant
            "rating": rating
            "cuisine": cuisines provided
            "price": price for two people
        }
        """
        url = (
            "https://www.eazydiner.com/restaurants?location="
            + self.location.replace(" ", "-").replace(",", "").lower()
        )
        try:
            res = requests.get(url)
            soup = BeautifulSoup(res.text, "html.parser")

            restaurant_data = {"restaurants": []}

            restaurants = soup.select(".restaurant")
            for r in restaurants:
                name = r.find("h3", class_="res_name").getText().strip()
                location = r.find("h3", class_="res_loc").getText().strip()
                rating = r.find("span", class_="critic").getText().strip()
                cuisine = (
                    r.find("div", class_="res_cuisine").getText().replace(",", ", ")
                )
                price = (
                    r.find("span", class_="cost_for_two")
                    .getText()
                    .encode("ascii", "ignore")
                    .decode()
                    .strip()
                )
                restaurant_data["restaurants"].append(
                    {
                        "restaurant": name,
                        "location": location,
                        "rating": rating,
                        "cuisine": cuisine,
                        "price": "Rs. " + price + " for two",
                    }
                )
            res_json = json.dumps(restaurant_data)
            return res_json
        except:
            error_message = {
                "message": "There are no restaurants in the given location."
            }
            ejson = json.dumps(error_message)
            return ejson