const gTTS = require('@killovsky/gtts');
const path = require('path')
const fs = require('fs')
const settings = require('../settings')

async function tts(sock,jid,msgkey,convo){
	var jid2 = jid
	await sock.sendMessage(jid2, {
    delete: msgkey
  });
  if (convo == "" ) {
    await sock.sendMessage(jid2, {
            text: "*Correct Usage*\n.tts <text you want to convert>"
         });
    return }

	let dpath = path.join(path.resolve(settings.PROJECT_DIR),'tempStorage', 'tts.mp3')
	let bufferss = await gTTS.create("hi", convo.trim(), false, dpath)
               await fs.writeFile(dpath, bufferss.gtts.buffer, async () => {
                  await sock.sendMessage(
                     jid2, {
                        audio: fs.readFileSync(dpath),
                        mimetype: 'audio/mp4'
                     })
                  console.log("successful")
               })

}

module.exports = tts;