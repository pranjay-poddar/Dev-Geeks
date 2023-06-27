const {
   default: makeWASocket,
   MessageType,
   MessageOptions,
   Mimetype,
   useMultiFileAuthState,
   downloadMediaMessage,
   downloadContentFromMessage,
   fetchLatestBaileysVersion,
   proto,
   DisconnectReason,
   makeInMemoryStore,
   MessageRetryMap
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const {PROJECT_DIR} = require('./settings')

let help = require('./command/getAllCommands');
let time = require('./command/time');
let alive = require('./command/alive');
let system = require('./command/system');
let weather = require('./command/weather');
let tts = require('./command/textToSpeech');
let yts = require('./command/ytSearch');
let ytdl = require('./command/ytdl');
let song = require('./command/song');
let imgToSticker = require('./command/sticker');
let animeImg = require('./command/animeImages');
let setPP = require('./command/profilePicture');

const store = makeInMemoryStore({logger: pino().child({level: 'silent',stream: 'store'})})
store.readFromFile('./baileys_store.json')

setInterval(() => {
    store.writeToFile('./baileys_store.json')
}, 10_000)

async function connectToWhatsApp() {
   const {state,saveCreds} = await useMultiFileAuthState('baileys_auth_info')
   const {version,isLatest} = await fetchLatestBaileysVersion()
   console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

   const sock = makeWASocket({
      logger: pino({ level: 'silent' }),
      version,
      // can provide additional config here
      printQRInTerminal: true,
      auth: state,
      browser:  ['BETA MIRA OS', 'Chrome', '1.0.0'], 
      getMessage: async key => {
         if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg.message || undefined
         }

         // only if store is present
          return getMessageFromStore(key.remoteJid, key.id)?.message || { conversation: 'Please command again' }
      }
   })

   store.bind(sock.ev)

   sock.ev.on('creds.update', saveCreds)
   sock.ev.on('connection.update', (update) => {

      const {
         connection,
         lastDisconnect
      } = update
      if (connection === 'close') {
         const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
         console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
         // reconnect if not logged out
         if (shouldReconnect) {
            connectToWhatsApp()
         }
      } else if (connection === 'open') {
         console.log('opened connection')
      }
   })

   // console.log(store.contacts)
   // console.log('LOADMESSAGES...' + JSON.stringify(store.messages['120363021952807518@g.us'].array,undefined,4));

   sock.ev.on('messages.upsert', async (m) => {
      let msgkey,jid,fromMe,command;

      try{
         msgkey = m.messages[0].key;
         jid = m.messages[0].key.remoteJid;
         fromMe = m.messages[0].key.fromMe;
         command = (m.messages[0].message.conversation).split(' ')[0];
         commandF = m.messages[0].message.conversation;

         console.log('msgkey-->>' + msgkey)
         console.log('jid-->>' + jid)
         console.log('fromMe-->>' + fromMe)
         console.log('command-->>' + command)
      }catch(err){
         console.log(err)
      }
      let status1,command2,msgType,isReplied;
      try {
         status1 = m.messages[0].message.extendedTextMessage;
         command2 = (status1.text).split(' ')[0]
         command2F = status1.text
         msgType = Object.keys(m.messages[0].message.extendedTextMessage.contextInfo.quotedMessage);
         isReplied = true;
         replied = false;
         console.log('___________________________________')
         console.log('status1-->>' + JSON.stringify(status1))
         console.log('command2-->>' + command2)
         console.log('msgType-->>' + msgType)
         console.log('isReplied-->>' + isReplied)
      } catch {
         isReplied = false;
      }
      
      try{
         let query;
         if (fromMe) {
            switch(command){
               case '.help':
                     help(sock,jid,msgkey)
                     break;
               case '.hello':
                     alive(sock,jid,msgkey);
                     break;
               case '.time':
                     time(sock,jid,msgkey);
                     break;
               case '.system':
                     system(sock,jid,msgkey);
                     break;
               case '.weather':
                     await weather(sock,jid,msgkey);
                     break;
               case '.tts':
                     let convo = commandF.slice(5,commandF.length)
                     await tts(sock,jid,msgkey,convo);
                     break;
               case '.yts':
                     query = commandF.slice(5,commandF.length).trim()
                     await yts(sock,jid,msgkey,query);
                     break;
               case '.ytdl':
                     let url = commandF.slice(6,commandF.length).trim()
                     await ytdl(sock,jid,msgkey,url);
                     break;
               case '.song':
                     query = commandF.slice(6,commandF.length).trim()
                     await song(sock,jid,msgkey,query);
                     break;
               case '.animeimg':
                     query = commandF.slice(10,commandF.length).trim()
                     await animeImg(sock,jid,msgkey,query);
                     break;
            }
            if (isReplied) {
               if (msgType == 'imageMessage') {
                  switch(command2){
                     case '.sticker':
                           let buffer = Buffer.from([]);
                           let pathed = path.resolve(PROJECT_DIR,'tempStorage','img.jpg');
                           const stream = await downloadContentFromMessage(
                                  m.messages[0].message.extendedTextMessage.contextInfo.quotedMessage.imageMessage,
                                             "image")
                           for await (const chunk of stream) {
                              buffer = Buffer.concat([buffer, chunk])
                           }
                           imgToSticker(sock,jid,msgkey,buffer)
                           break;
                     case '.pp':
                           buffer = Buffer.from([]);
                           pathed = path.resolve(PROJECT_DIR,'tempStorage','img.jpg');

                           stream = await downloadContentFromMessage(m.messages[0].message.extendedTextMessage.contextInfo.quotedMessage.imageMessage,"image");

                           for await (const chunk of stream) {
                              buffer = Buffer.concat([buffer, chunk])
                           }
                           setPP(sock,jid,msgkey,buffer)


                  }
               };
            }
            

            
         }

      }catch(err){console.log(err)}})


}
connectToWhatsApp()