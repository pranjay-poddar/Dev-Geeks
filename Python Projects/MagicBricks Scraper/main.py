from bs4 import BeautifulSoup
import requests


class MagicBricks:
    """
    Create an instance of the `MagicBricks` class to fetch ready-to-move flats data.

    Example:
    ```python
    magic_bricks = MagicBricks()
    flats_data = magic_bricks.flats_by_city(city="Agra")
    print(flats_data)
    ```

    | Method                           | Details                                                      |
    | ******************************** | ************************************************************ |
    | `flats_by_city(city)`        | Fetches and returns the details of ready-to-move flats in the specified city.

    """

    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win 64 ; x64) Apple WeKit /537.36(KHTML , like Gecko) Chrome/80.0.3987.162 Safari/537.36"
        }

    def flats_by_city(self, city):
        """
        Fetches and returns the details of ready-to-move flats in the specified city.

        param `city`: The name of the city (e.g., "Agra").\n
        Example output:
        ```python
        [
            {
                "Title": "2 BHK Apartment in Agra",
                "Details": [
                    {"Beds": "2 BHK"},
                    {"Baths": "2 Baths"},
                    {"Area": "900 sqft"},
                    {"Furnished": "Unfurnished"},
                    {"Status": "Ready to Move"},
                    {"Floor": "3"},
                ],
                "Description": "Apartment Description...",
                "Amount": "₹ 45 Lac",
                "Price Per SQFT": "₹ 5,000/sqft"
            },
            ...
        ]
        ```
        """
        try:
            city = city.replace(" ", "-")
            city = city.lower()
            url = f"https://www.magicbricks.com/ready-to-move-flats-in-{city}-pppfs"
            html_text = requests.get(url, headers=self.headers).text
            soup = BeautifulSoup(html_text, "lxml")

            houses = []
            container = soup.find("div", {"class": "mb-srp__left"})
            for items in container.find_all("div", {"class": "mb-srp__list"}):
                title = items.find("h2")
                i = 0
                labels = []
                for item in items.find_all(
                    "div", {"class": "mb-srp__card__summary__list--item"}
                ):
                    if i < 6:
                        label = item.find(
                            "div", {"class": "mb-srp__card__summary--label"}
                        )
                        value = item.find(
                            "div", {"class": "mb-srp__card__summary--value"}
                        )
                        labels.append({label.text: value.text})
                        i += 1
                    else:
                        break
                description = items.find("div", {"class": "mb-srp__card--desc--text"})
                if description:
                    description = description.text
                else:
                    description = None
                amount = items.find("div", {"class": "mb-srp__card__price--amount"})
                price_per_sqft = items.find(
                    "div", {"class": "mb-srp__card__price--size"}
                )
                if price_per_sqft:
                    price_per_sqft = price_per_sqft.text
                else:
                    price_per_sqft = None
                data = {
                    "Title": title.text,
                    "Details": labels,
                    "Description": description,
                    "Amount": amount.text,
                    "Price Per SQFT": price_per_sqft,
                }
                houses.append(data)
            return houses
        except:
            return None

mb = MagicBricks()
print(mb.flats_by_city(city="Agra"))
