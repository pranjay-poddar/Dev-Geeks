const { PROJECT_DIR } = require("../settings");
const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");

const pathed = path.resolve(PROJECT_DIR, "tempStorage", "animeImages.json");

async function animeImages(sock, jid, msgkey, anime) {
  let jid2 = jid;
  await sock.sendMessage(jid2, {
    delete: msgkey,
  });

  let cleanAnime = anime.replace(" ", "+");
  console.log(cleanAnime);
  try {
    request(
      `https://wall.alphacoders.com/search.php?search=${cleanAnime}`,
      async (err, res, body) => {
        if (err) {
          console.log(err);
        }
        let $ = cheerio.load(body);
        let image = $("picture > img");

        console.log(typeof image);
        let api = [];
        console.log(Object.keys(image))


        for (var i = 0; i < image.length; i++) {
          let obj = { attr: "", img: "" };

          obj.attr = image[i].attribs.alt;
          obj.img = image[i].attribs.src;

          api.push(obj);
        }

        fs.writeFile(pathed, JSON.stringify(api), (err) => {
          console.log("Error Occur at animeImages.js ------->" + err);
        });
      }
    );

    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    try {
      setTimeout(() => {
        fs.readFile(pathed, async (err, data) => {
          let trueData = JSON.parse(data);
          for (var i = 0; i < 5; i++) {
            
            let randomNum = randomNumber(0, trueData.length);
            let caption = trueData[randomNum].attr;
            let img = trueData[randomNum].img;

            await sock.sendMessage(jid2, {
              image: { url: img },
              caption: caption,
            });
          }
        });
      }, 3000);
    } catch {}
  } catch (err) {
    await sock.sendMessage(jid2, {
      text: "❌❌An error occured or anime does not exist on server",
    });
  }
}

module.exports = animeImages;
