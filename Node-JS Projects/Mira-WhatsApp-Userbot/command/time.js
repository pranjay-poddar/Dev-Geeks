async function time(sock,jid,msgkey){
	var jid2 = jid
         await sock.sendMessage(jid2, {
            delete: msgkey
         });
         var msg = await sock.sendMessage(jid2, {
            text: `*${new Date().toString()}*`,
         });
}

module.exports = time; 