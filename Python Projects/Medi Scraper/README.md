## Medical Encyclopedia Scraper

This web scraper is made from the Jsoup and requests libraries in python. It has 3 different functions which the users can implement with:

- **byletter():** It returns all the medical entries in the encyclopedia starting with a particular english letter.
- **scrapebyurl():** It returns the medical data including references, review dates, content, topic-head and so on based on a particular mediline's url.
- **query():** This function takes a query from the users and returns all the matching terms/responses from the encyclopedia matching the user's query. If there is no matching response, than it returns None

## Usage Guidelines
- First import the scraper class like so: ```from mediscraper import MediEncyclopedia```
- Create an instance of the class like so: ```ency = MediEncyclopedia()```
- Call relevant functions as required. Ex: ```ency.byletter('A)``` or ```ency.scrapebyurl(url)``` or ```ency.query('Heart attack')```
- After call, the functions gonna return the relevant results. 


   
