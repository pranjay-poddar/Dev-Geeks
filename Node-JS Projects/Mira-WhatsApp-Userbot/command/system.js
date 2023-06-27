const os = require('os')

async function system(sock,jid,msgkey){
	let totalMem = ((os.totalmem()) / 1024) / 1024;
    let freeMem = ((os.freemem()) / 1024) / 1024;
    let botUptime = ((os.uptime()) / 60) / 60;
    let osType = os.type();
    let freeMemP = (os.freemem() / os.totalmem()) * 100

	var jid2 = jid
    await sock.sendMessage(jid2, {
    	delete: msgkey
	});
    
    let cpu = JSON.stringify(os.cpus())

    var msg = await sock.sendMessage(jid2, {
    	text: `*SYSTEM INFO* \n\n*Memory:* ${100 - Math.floor(freeMemP)}%\n*Platform:* ${os.platform()}\n*Version:* ${os.version()}\n*Uptime:* ${Math.floor(botUptime)}hrs  `
    });

}

module.exports = system; 