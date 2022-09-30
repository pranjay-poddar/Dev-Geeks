const PORT = process.env.PORT || 5000           //specially for deploying on heroku
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const res = require('express/lib/response');

const newspapers = [
    {
        name: 'cityam',
        address: 'https://www.cityam.com/technology/',
        base: ''
    },
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/topic/technology?page=1',
        base: ''
    },
    {
        name: 'Guardian',
        address: 'https://www.theguardian.com/uk/technology',
        base: '',
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/technology/',
        base: 'https://www.telegraph.co.uk',
    },
    {
        name: 'newyorktimes',
        address: 'https://www.nytimes.com/international/section/technology',
        base: 'https://www.nytimes.com',
    },
    {
        name: 'latimes',
        address: 'https://www.latimes.com/business/technology',
        base: '',
    },
    {
        name: 'eveningstandard',
        address: 'https://www.standard.co.uk/tech',
        base: 'https://www.standard.co.uk'
    },
    {
        name: 'thehindu',
        address: 'https://www.thehindu.com/sci-tech/technology/',
        base: ''
    }
]

const app = express()

const articles = []



newspapers.forEach(element => {
    axios.get(element.address)
        .then((response) => {
            const html = response.data
            //console.log(html)
            const $ = cheerio.load(html)

            $('a:contains("Start Up"), a:contains("Elon Musk"), a:contains("Amazon"), a:contains("Apple"), a:contains("Meta"), a:contains("Microsoft"), a:contains("Drones"), a:contains("Electric")',html).each(function (){
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: element.base + url,
                    source: element.name
                })
            })
        }).catch((err) => console.log(err))

});

app.get('/', (_req, res) =>{
    res.json('Welcome to my API')
})

app.get('/news', (_req,res) =>{
    res.json(articles)
})

app.get('/news/:newspaperId', async(req,res) => {
    const Id = req.params.newspaperId

    const newspaperLink = newspapers.filter(element => element.name == Id)[0].address
    console.log(newspaperLink)
    const base = newspapers.filter(element => element.name == Id)[0].base

    axios.get(newspaperLink)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            particularArticle = []

            $('a:contains("Start Up"), a:contains("Elon Musk"), a:contains("Amazon"), a:contains("Apple"), a:contains("Meta"), a:contains("Microsoft"), a:contains("Drones"), a:contains("Electric")',html).each(function (){
                const title = $(this).text()
                const url = $(this).attr('href')
                particularArticle.push({
                    title,
                    url: base + url,
                    source: Id
                })
            })
            res.json(particularArticle)

        }).catch((err) => console.log(err))
});

app.listen(PORT, () => console.log(`server running on PORT http://localhost:${PORT}`))

