const {PROJECT_DIR} = require('../settings')
const fs = require('fs');
const path = require('path');
const ytSearch = require('yt-search');

async function yts(sock,jid,msgkey,query) {
	 jid2 = jid
	await sock.sendMessage(jid2, {
		delete: msgkey
    });
	if (query == '' || query == undefined) {
		return
	};
	const r = await ytSearch(`${query}`.toString())
    const videos = r.videos
    for (let i = 0; i < 6; i++) {
    	// result.push(videos[i].title +' | ' +videos[i].timestamp +' | ' + videos[i].ago  +' | ' + videos[i].url);
        let msg = await sock.sendMessage(jid2, {
        	text: `${videos[i].title} | ${videos[i].timestamp} | ${videos[i].ago}  | ${videos[i].url}\n`
        	})
	}
}

module.exports = yts;