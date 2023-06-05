from urllib.request import urlopen as ureq
from bs4 import BeautifulSoup as Soup

my_url = "https://www.newegg.com/Video-Cards-Video-Devices/Category/ID-38?Tpk=graphics%20card"

# opening up connection and grabbing the link
uClient = ureq(my_url)
page_html = uClient.read()
uClient.close()

# html parsing
page_soup = Soup(page_html, 'html.parser')

# grabs each product
containers = page_soup.findAll("div", {"class": "item-container"})

filename = "products.csv"
f = open(filename, "w")

headers = "brand, product_name, shipping\n"

f.write(headers)

for container in containers:
    brand = container.div.div.a.img["title"]
    # finding the product name of each result
    title_container = container.findAll("a", {"class": "item-title"})
    product_name = title_container[0].text
    # finding the shipping of the item
    shipping_container = container.findAll("li", {"class": "price-ship"})
    shipping = shipping_container[0].text.strip()

    print("brand: " + brand)
    print("product_name: " + product_name)
    print("shipping: " + shipping)

    f.write(brand + "," + product_name.replace(",", " ") + "," + shipping + "\n")

f.close()
