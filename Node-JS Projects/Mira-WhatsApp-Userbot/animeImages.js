const cheerio = require("cheerio");
const request = require("request");
const axios = require("axios");
const fs = require("fs");

async function animeImages(anime) {
  let cleanAnime = anime.trim();
  let cleanAnime2 = cleanAnime.replace(" ", "+");
  request(
    `https://wall.alphacoders.com/search.php?search=${anime}`,
    async (err, res, body) => {
      if (err) {
        
      }
      const response = await axios.get(`https://wall.alphacoders.com/search.php?search=${cleanAnime2}`)
      let $ = cheerio.load(response.data);

      let image = $("picture > img");

      console.log(Object.keys(image))

      let api = [];
      for (var i = 0; i < image.length; i++) {
        let obj = { attr: "", img: "" };

        obj.attr = image[i].attribs.alt;
        obj.img = image[i].attribs.src;

        api.push(obj);
      }

      fs.writeFile("animeImages.json", JSON.stringify(api), (err) => {});
    }
  );
}

animeImages("naruto");

module.exports = animeImages;
