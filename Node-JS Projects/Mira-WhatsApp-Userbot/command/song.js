const {PROJECT_DIR} = require('../settings')
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const ytdl = require('ytdl-core');

async function song(sock,jid,msgkey,url){
	var jid2 = jid
	await sock.sendMessage(jid2, {
    delete: msgkey
  });

	if (url == '') {
		await sock.sendMessage(jid2, {
            text: "*Correct Usage*\n.ytdl <youtube video link>"
         });

		return
	}
	let pathed = path.resolve(PROJECT_DIR,'tempStorage','song.mp3');

	try{
		
            let audio = ytdl(url, {
               quality: 'highestaudio',
            })

            audio.pipe(fs.createWriteStream(pathed))
            audio.on('progress', (chunkLength, downloaded, total) => {
               const percent = downloaded / total;
               readline.cursorTo(process.stdout, 0);
               process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
               process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
               readline.moveCursor(process.stdout, 0, -1);
            })
            audio.on('end', async () => {
               process.stdout.write('\n\n');
               await sock.sendMessage(
                  jid2, {
                     audio: fs.readFileSync(pathed),
                     mimetype: 'audio/mp4'
                  }

               )
            })


	}catch(err){console.log(err)}
}

module.exports = song;