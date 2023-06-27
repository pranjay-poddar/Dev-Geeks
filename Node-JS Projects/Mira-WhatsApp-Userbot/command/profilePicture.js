const {PROJECT_DIR} = require('../settings')
const fs = require('fs');
const path = require('path');
const sharp = require('sharp')
require('dotenv').config({ path: '../.env' })

async function profilePicture(sock,jid,msgkey,buffer){
	var jid2 = jid
	await sock.sendMessage(jid2, {
		delete: msgkey
	});
	let pathed = path.resolve(PROJECT_DIR,'tempStorage','ppic.jpeg');

    try{
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        await sharp(buffer)
        .resize({height:500,fit:'cover'})
        .resize({height:500,width:500,fit:'cover'})
        .toFile(pathed, async (error, info) => {
            if (error) {
                console.log(error)
            };
            
            await sock.updateProfilePicture(process.env.OWNER, {
                url: pathed
            })

            await sock.sendMessage(jid2, {
                text: '✅ *Profile Pic Changed Successfully*'
                })
            })

        }catch(err){
            console.log(err)
        }

}

module.exports = profilePicture