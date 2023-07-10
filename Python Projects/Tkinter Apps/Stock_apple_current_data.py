# demo api key:  OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX
# url : wss://ws.eodhistoricaldata.com/ws/crypto?api_token=XXX      #this is not api.
# not done with Tkinter.

#  https://eodhistoricaldata.com/api/real-time/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&fmt=json

import requests
import json


api_request=requests.get("https://eodhistoricaldata.com/api/real-time/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&fmt=json")
api=json.loads(api_request.content)
print(api)



# https://eodhistoricaldata.com/api/eod-bulk-last-day/US?api_token={YOUR_API_KEY}&symbols=MSFT,AAPL&fmt=json
# use this to get data in bulk.