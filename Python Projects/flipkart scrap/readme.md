                                                        WEB SCRAPING

We are doing web scraping of filpkart with Python, which will let us analyse the data from a specific website and store it in many formats such as CSV, txt, excell, and so on. 
this data can use for various reasons  like for sentiment analyse and want to know specific review from multiple user.

-<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<   STEPS   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

STEP 1;
We are request to "flipkart" for scraping the data.
requests.get :- function is use becoz to know the status code. request to flipkart from fetching the data in form of html
response 200:- we can succesfully get the data in form web.

STEP 2:
(i)=know how to deal with multiple pages :
(ii)=format use-LXML = allows for easy handling of XML and HTML files, and can also be used for web scraping.
(iii)=get the html of web in you vs or local so that u can work on it.
(iv)=as their are many pages realted to SINGLE so now fetch data form multiple pages
        -try to find ancare tag <a> in the html of page
        -not for 2,3 just for NEXT page.
            -we have to find a tag of particular tag and for link href and print that.
            -in href there is link without the 'https' so to get we just add
             cnp="https://www.flipkart.com"+np

(v)=so for web scrap we have to fetch the link of all pages its time taking process so we create a loop for this procces which fetch all link for us.
        now we will use for loop to fetch data
        for i in range(1(start),10(end))             
        to move multiple pages we have to use in last of link + [srt(i)]
(vi)=Decide want data want to scrap like:-
        -product name ,prize, reveiws ,description.
        -create list for every indivdual info.
            -Product_name=[]
            -Prices=[]
            -Description=[]
            -Reviews=[]
(vii)=now create a function for each info what u want to fetch and store that data into realted list.
        revi=soup.find_all("div",class_="_3LWZlK")
        for i in revi:
            name=i.text
            Reviews.append(name)
        print(Reviews)
        similarly do for all the list 
(viii)=point to remember that we are scraping data form parcticluar box or area so we have to specify that area making variable BOX.
(xi)=now create the datafarme with the help of pandas pf.DATAFRAME({"key":value}) store int the form of key and value.
    no remember that we are scraping the data for multiple pages so DON'T FORGET TO RE APPLY THE FOR LOOP AND THE str(i) for multiple pages.

(xii)=last step to convet that data frame into csv file
df.to_csv("filpkart-scraping-under-50k.csv")