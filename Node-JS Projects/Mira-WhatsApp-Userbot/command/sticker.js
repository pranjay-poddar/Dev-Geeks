const {PROJECT_DIR} = require('../settings')
const fs = require('fs');
const path = require('path');
const sharp = require('sharp')
const {default: downloadContentFromMessage} = require('@whiskeysockets/baileys')

async function imgToSticker(sock,jid,msgkey,buffer){
	var jid2 = jid
	await sock.sendMessage(jid2, {
		delete: msgkey
	});
	let pathed = path.resolve(PROJECT_DIR,'tempStorage','imgToSticker.webp');

	
    

    try {
    	

    	await sharp(buffer)
    	.resize({
    		height: 512,
    		fit: 'cover'
    	})
    	.webp({
    		effort: 6
    	})
    	.toFile(pathed, async (error, info) => {
    		if (error) {
    			console.log(error)
    		}
    		await sock.sendMessage(jid2, {
    			sticker: fs.readFileSync(pathed)
    		})
    	})

    } catch (err) {
    	console.log(err)
    }
}

module.exports = imgToSticker