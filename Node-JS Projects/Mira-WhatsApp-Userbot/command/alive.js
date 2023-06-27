async function alive(sock,jid,msgkey){
	var jid2 = jid
         await sock.sendMessage(jid2, {
            delete: msgkey
         });
         var msg = await sock.sendMessage(jid2, {
            text: "😍😍😍😍\n*I am alive*\n🙌🙌🙌🙌🙌"
         });
}

module.exports = alive; 