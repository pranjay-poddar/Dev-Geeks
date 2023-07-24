const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const photoManipulate = {};

photoManipulate.changephoto = async (req, res, next) => {
  try {
    let w = req.params.w - 0;
    let h = req.params.h - 0;
    let picpath = req.params[0];

    if (fs.existsSync(`./public/${w}-${h}/${picpath}`)) {
      return next();
    }
    if (!fs.existsSync(`./public/${picpath}`)) {
      return next();
    }
    if (!h) {
      h = Jimp.AUTO;
    }
    Jimp.read(`./public/${picpath}`, async (err, image) => {
      if (err) {
        return next();
      }
      if (image) {
        var o_w = image.bitmap.width;
        var o_h = image.bitmap.height;
        if (o_w > w || o_h > h) {
          const i = await image.scaleToFit(w, h).write(`./public/${w}-${h}/${picpath}`);
        } else {
          const i = await image.write(`./public/${w}-${h}/${picpath}`);
        }
        fs.readFile(`./public/${w}-${h}/${picpath}`, async function (err, data) {
          if (err) {
            return res.sendFile(path.join(__dirname, `../public/${picpath}`));
          } else {
            return res.send(data);
          }
        });
      }
    }).catch((err) => {
      return next();
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = photoManipulate;
