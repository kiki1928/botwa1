/*
* "Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan?
* Amat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan."
* (QS ash-Shaff: 2-3).
*/
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const axios = require('axios')
const moment = require('moment-timezone')
const get = require('got')
const fetch = require('node-fetch')
const color = require('./lib/color')
const { spawn, exec } = require('child_process')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const { liriklagu, quotemaker, randomNimek, fb, sleep, jadwalTv, sarahfs, nulis, ss } = require('./lib/functions')
const { help, snk, info, donate, readme, listChannel } = require('./lib/help')
const { stdout } = require('process')
const nsfw_ = JSON.parse(fs.readFileSync('./lib/NSFW.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/leveling.json'))
const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
const banned = JSON.parse(fs.readFileSync('./lib/banned.json'))
const { getStickerMaker } = require('./lib/ttp')
const _level = JSON.parse(fs.readFileSync('./database/level.json'))
const _afk = JSON.parse(fs.readFileSync('./database/afk.json'))
const { RemoveBgResult, removeBackgroundFromImageBase64, removeBackgroundFromImageFile } = require('remove.bg')
// Projector //
let pendaftar = JSON.parse(fs.readFileSync('./lib/database/user.json'))
const left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = msgHandler = async (client, message,rugaapi) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption,author, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
       // let { pushname, verifiedName } = sender
       // pushname = pushname || verifiedName
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args =  commands.split(' ')

        const msgs = (message) => {
            if (command.startsWith('!')) {
                if (message.length >= 10){
                    return `${message.substr(0, 15)}`
                }else{
                    return `${message}`
                }
            }
        }
       /* if (isGroupMsg && isLevelingOn) {
            const currentLevel = getInfoLevel(sender.id)
            const checkId = getInfoId(sender.id)
            try {
                if (currentLevel === undefined && checkId === undefined) {
                    addUserId(sender.id)
                } else {
                    const amountXp = Math.floor(Math.random() * 10) + 500
                    const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                    const getXp = getInfoXp(sender.id)
                    addUserXp(sender.id, amountXp)
                    if (requiredXp <= getXp) {
                        addUserLevel(sender.id, 1)
                        const getLevel = getInfoLevel(sender.id)
                        await client.sendText(from, `Selamat ${pushname}! Kamu naik ke level ${getLevel}!`)
                    }
                }
            } catch (err) {
                console.error(err)
            }
        }*/
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
                for(var i=0; i < mask.length; i++){
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
        }
        
        var nmr = sender.id
        var obj = pendaftar.some((val) => {
            return val.id === nmr
        })
        var cekage = pendaftar.some((val) => {
            return val.id === nmr && val.umur >= 15
        })

        function monospace(string) {
            return '```' + string + '```'
        }


        function isReg(obj){
            if (obj === true){
                return false
            } else {     
                return client.reply(from, `Kamu belum terdaftar sebagai Teman MAULHDC Bot\nuntuk mendaftar kirim !daftar |nama|umur\n\ncontoh format: !daftar |maul|20\n\ncukup gunakan nama depan/panggilan saja`, id) //if user is not registered
            }
        }

        function cekumur(obj){
            if (obj === true){
                return false
            } else {
                return client.reply(from, `Kamu belum cukup umur untuk menggunakan MAULHDC Bot, min 16 tahun\n\nKamu bisa mendaftar ulang dengan cara donasi terlebih dahulu, bales !donasi\nHubungi Owner : wa.me/6281212497030`, id) //if user is not registered
            }
        }
function monospace(string) {
  return '```' + string + '```'
}

// Serial Number Generator
function GenerateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Generates a random alphanumberic character
function GenerateRandomChar() {
  var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
  var randomNumber = GenerateRandomNumber(0, chars.length - 1);
  return chars[randomNumber];
}
// Generates a Serial Number, based on a certain mask
function GenerateSerialNumber(mask) {
  var serialNumber = "";
  if (mask != null) {
    for (var i = 0; i < mask.length; i++) {
      var maskChar = mask[i];
      serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
    }
  }
  return serialNumber;
}

         const apakah = [

            'Ya',
            'Tidak',
            'Coba Ulangi'
            ]

        const bisakah = [
            'Bisa',
            'Tidak Bisa',
            'Coba Ulangi'
            ]
        const mama = [
            'Tutup Hp dan Tidur Dan Masalah anda selesai',
            'Minum Baigon Dan pikiran kembali rileks',
            'Jangan Hiraukan Dia akan kembali sendiri',
            'Mending Pilih Yang baru lupakan yang lama',
            'Lempar Hp Dan Katakan Alhamdulillah',
            'Pikirin Sendiri Mama capek'
            ]
        const bapak = [
          'Ngapain Perjuangin Dan pada akhirnya milik orang Mending Bantu ayah kerja',
          'Meding nyerah ngapain Usaha Karna usaha itu melelahkan',
          'Mending tidur',
          'Mending Makan Lebih Berfaedah',
          'Ga Usah Dipikirkan Mending be happy',
          'Mendokossoi nee',
          'Tutup Telinga Dan KOMTOL',
          'Kejam kan Mata dan teriak Komtol',
          'Ingat Mantan Dan katakan sampah'
          ]
        const kapankah = [
            '1 Minggu lagi',
            '1 Bulan lagi',
            '1 Tahun lagi',
            '2 Tahun lagi',
            '3 Tahun lagi',
            '4 Tahun Lagi',
            '5 Tahun lagi',
            '6 Tahun lagu',
            '15 Tahun lagi',
            '20 Tahun lagi',
            'mungkin Besok'
            ]
      
      const berapa = [
            '10×/hari',
            '1×/bulan',
            '100×/bulan',
            '1000×/tahun',
            '3×/hari',
            'tebak sendiri'
            ]
      const balas = [
      			'Nani Nani',
      			'Okiette',
      			'Ayeee Ada yang bisa saya bantu ketik !help untuk melihat menu Saya',
      			'Owalah jancok',
      			'Haikk',
      			'aree Kau Dari mana',
      			'Mine Mine',
      			'Ada apa kak Panggil MAULHDC Bot!',
      			'Masih MAULHDC Bot liatin'
      			]
      const rate = [

            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
            ]
        const mess = {
            wait: '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar',
            magernulissatu: 'Harap Tunggu, BOT Sedang Menulis Di Buku 1!',
            error: {
                St: '[❗] Kirim gambar dengan caption *!sticker* atau tag gambar yang sudah dikirim',
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan admin group!',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }
        const errorurl2 = 'https://www.linkpicture.com/q/IMG-20201217-WA0763.jpg'
        const apiKey = 'Angga.Voldigoad' // apikey you can get it at https://mhankbarbars.herokuapp.com/api
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await client.getHostNumber()
        
        const blockNumber = await client.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName
        const ownerNumber = ["6281212497030@c.us"] // replace with your whatsapp number
        const isOwner = ownerNumber.includes(sender.id)
        const SN = GenerateSerialNumber("000000000000000000000000")
        const isBanned = banned.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
      //  const isLevelingOn = isGroupMsg ? _leveling.includes(chat.id) : false
       // const isAfkOn = getAfk(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        if(body == '!ping'){
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            const batteryLevel = await client.getBatteryLevel()
            const charged = await client.getIsPlugged();
            await client.sendText(from, `Status bot : *${'%state'.replace('%state', state.status)}*\nSpeed: ${processTime(t, moment())} _detik_\n\n*Bot Device Battery Info*\nBattery Level : ${batteryLevel}%\nIs Charging : ${charged}\n\n_*Waktu Server Bot :*_ ${moment(t * 1000).format('HH:mm:ss')} WIB`)
        }
        
        //const getInfoXp = (userId) => {
            /*let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].xp
            }
        }

        const getInfoLevel = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].level
            }
        }

        const getInfoId = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].id
            }
        }

        const addUserXp = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].xp += amount
                fs.writeFileSync('./database/level.json', JSON.stringify(_level))
            }
        }

        const addUserLevel = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].level += amount
                fs.writeFileSync('./database/level.json', JSON.stringify(_level))
            }
        }

        const addUserId = (userId) => {
            let obj = {id: `${userId}`, xp: 1, level: 1}
            _level.push(obj)
            fs.writeFileSync('./database/level.json', JSON.stringify(_level))
        }
        const addAfk = (userId, time) => {
            let obj = {id: `${userId}`, time: `${time}`}
            _afk.push(obj)
            fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
        }

        const getAfk = (userId) => {
            let isAfk = false
            Object.keys(_afk).forEach((i) => {
                if (_afk[i].id === userId) {
                    isAfk = true
                }
            })
            return isAfk
        }
        if (isGroupMsg) {
            const checking = getAfk(sender.id)
            for (let ment of mentionedJidList) {
                if (getAfk(ment)) {
                    await client.reply(from, ind.afkMentioned(), id)
                }
            }
            if (checking) {
                _afk.splice(sender.id, 1)
                fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
                await client.sendText(from, ind.afkDone(pushname))
            }
        }*/
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        if (!isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
        				/*if (chats.match("paimon") || chats.match("Paimon") || chats.match("PAIMON") || chats.match("bot") || chats.match("Bot") || chats.match("BOT")) {
        				  const bls = balas[Math.floor(Math.random() * (balas.length))]
        				  await client.reply(from, `*${bls}* \n\n`, id)
        				}
 */
        //if (!isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname))
        //if (isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname), 'in', color(formattedTitle))
        if (isBanned) return
        if (isBlocked) return
        //if (!isOwner) return
        switch(command) {
        case '!sticker':
        case '!stiker':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await client.sendImageAsSticker(from, imageBase64)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await client.sendImageAsSticker(from, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await client.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    client.reply(from, mess.error.Iv, id)
                }
            } else {
                    client.reply(from, mess.error.St, id)
            }
            break
      /*  case '!stickergif':  if(isReg(obj)) return
            if(cekumur(cekage)) return
        case '!stikergif':  if(isReg(obj)) return
            if(cekumur(cekage)) return
        case '!sgif':  if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isMedia) {
                if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                    const mediaData = await decryptMedia(message, uaOverride)
                    client.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!', id)
                    const filename = `./media/aswu.${mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/output.gif --fps=30 --scale=240:240`, async function (error, stdout, stderr) {
                        const gif = await fs.readFileSync('./media/output.gif', { encoding: "base64" })
                        await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
                    })
                } else (
                    client.reply(from, '[❗] Kirim video dengan caption *!stickerGif* max 10 sec!', id)
                )
            }
            break*/
            case '!info': {
                    const charged = await client.getIsPlugged();
                    const device = await client.getMe() 
                    const deviceinfo = `- Battery Level : ${device.battery}%\n  ├ Is Charging : ${charged}\n  └ 24 Hours Online : ${device.is24h}\n- Phone : ${device.phone.device_manufacturer}\n  ├ OS Version : ${device.phone.os_version}\n  └ Build Number : ${device.phone.os_build_number}\n\n _*Jam :*_ ${moment(t * 1000).format('HH:mm:ss')}`
                    await client.sendText(from, info.replace('%state', state.status) + `\n\n*Device Info*\n${deviceinfo}`)
                }   
                    break
            // New fitur owner //
        /*    case '!lagu':
                case '!play':
                  //  if(isLimit(serial)) return
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    //if (!isPremium) return client.reply(from, 'Ini fitur premium? yuk #donasi seikhlasnya untuk jadi member premium\nkirim #premium untuk membaca fitur member premium', id)
                    if (!args.length >= 1) return client.reply(from, 'Format salah, #play judul lagu - artis', id)
                    {
                        const golek = body.slice(6)
                        yts(golek)
                        .then((r) =>  {
                            const videos = r.videos
                            const { videoId, title, duration } = videos[0];
                            const lagune = `https://www.youtube.com/watch?v=${videoId}`
                                fetch(`https://test.mumetndase.my.id/yta?url=${lagune}`)
                                .then((res) => {
                                    status = res.status
                                    return res.json()
                                }).then(async (body) => {
                                    const link = (body.result.dl_link)
                                    const dono = await urlShortener(link)
                                    const text = (`Music request by @${sender.id.replace(/[@c.us]/g, '')}\n\n● Judul : ` + title + `\n● Bitrate : 128kbps\n● Durasi : ${duration}\n● File size : ${timeConvert(body.result.filesize)}\n\n_Sedang mengirim audio_`)
                                    if (duration.seconds >= 800) {
                                        //limitAdd(serial)
                                        return client.sendTextWithMentions(from, `Music request by @${sender.id.replace(/[@c.us]/g, '')}\n\nJudul: ${title}\n\nDurasi ${duration} terlalu panjang.\nkamu bisa download sendiri menggunakan link ini dik. ${dono}`)
                                    }else{
                                        client.sendTextWithMentions(from, text)
                                        client.sendFile(from, link, `${title}.mp3`, null, id)
                                        //limitAdd(serial)
                                    }
                                }).catch((err) => {
                                    console.log(err)
                                       client.sendText(from, `Error, Api initialization failed. Please contact admin!`)
                                })
                        }) .catch(err => {
                            client.reply(from, `Error, Api initialization failed. Please contact admin!`, id);
                          });
                    }
                    break
           case '!addbacot':{
                   // if(isLimit(serial)) return
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    if (!args.length >= 1) return client.reply(from, 'BACOTAN NYA MANA ANJING?? DASAR BODOH!', id)  
                        const bacot = body.slice(10)
                       dbcot.push(bacot)
                        fs.writeFileSync('./lib/database/bacot.json', JSON.stringify(dbcot))
                        client.reply(from, `Sukses menambahkan Kata bacot ke database\nTotal data bacot sekarang : *${dbcot.length - 1}*`, id)
                        //limitAdd(serial)
                    }
                    break            
                case '!bacot':
                    //if(isLimit(serial)) return
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    if(args.length == 1) {
                        const no = args[0]
                        const cekdb = dbcot.length
                        if(cekdb <= no) return await client.reply(from, `Total data saat ini hanya sampai *${cekdb - 1}*`, id)
                        const res =  dbcot[no]
                        client.sendText(from, res)
                       // limitAdd(serial)
                        } else {
                            const kata = dbcot[Math.floor(Math.random()*dbcot.length)];
                            client.sendText(from, kata)
                          //  limitAdd(serial)
                        }
                    break*/
            case '!left':
          //  if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return client.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                left.push(chat.id)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                client.reply(from, 'Fitur left berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                left.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                client.reply(from, 'Fitur left berhasil di nonaktifkan di group ini!', id)
            } else {
                client.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
            case '!spamcall':
              if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner & Admin bot', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const spam = await slicedArgs.join(' ')
            console.log(spam)
            const call2 = await axios.get('https://tobz-api.herokuapp.com/api/spamcall?no=' + spam)
            const { logs } = call2.data
                await client.sendText(from, `Logs : ${logs}` + '.')
            break
            case '!setname':
            if (!isOwner) return client.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner MAULHDC Bot!`, id)
                const setnem = body.slice(9)
                await client.setMyName(setnem)
                client.sendTextWithMentions(from, `Makasih Nama Barunya @${sender.id.replace('@c.us','')} 😘`)
            break
        case '!setstatus':
            if (!isOwner) return client.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner MAULHDC Bot!`, id)
                const setstat = body.slice(11)
                await client.setMyStatus(setstat)
                client.sendTextWithMentions(from, `Makasih Status Barunya @${sender.id.replace('@c.us','')} 😘`)
            break
        case '!setprofilepic':
            if (!isOwner) return client.reply(from, `Perintah ini hanya bisa di gunakan oleh Owner MAULHDC Bot!`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await client.setProfilePic(imageBase64)
                client.sendTextWithMentions(`Makasih @${sender.id.replace('@c.us','')} Foto Profilenya 😘`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await client.setProfilePic(imageBase64)
                client.sendTextWithMentions(from, `Makasih @${sender.id.replace('@c.us','')} Foto Profilenya 😘`)
            } else {
                client.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #setprofilepic`, id)
            }
            break
        case '!getpic':
            if (!isGroupMsg) return client.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            const texnugm = body.slice(8)
            const getnomber =  await client.checkNumberStatus(texnugm)
            const useriq = getnomber.id.replace('@','') + '@c.us'
                try {
                    var jnck = await client.getProfilePicFromServer(useriq)

                    client.sendFileFromUrl(from, jnck, `awok.jpg`)
                } catch {
                    client.reply(from, `Tidak Ada Foto Profile!`, id)
                }
            break
            case '!setgroupname':
            if (!isGroupMsg) return client.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return client.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return client.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            const namagrup = body.slice(14)
            let sebelum = chat.groupMetadata.formattedName
            let halaman = global.page ? global.page : await client.getPage()
            await halaman.evaluate((chatId, subject) =>
            Store.WapQuery.changeSubject(chatId, subject),groupId, `${namagrup}`)
            client.sendTextWithMentions(from, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
            break
        case '!setgroupicon':
            if (!isGroupMsg) return client.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return client.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return client.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await client.setGroupIcon(from, imageBase64)
                client.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await client.setGroupIcon(from, imageBase64)
                client.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else {
                client.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #setgroupicon`, id)
            }
            break
          // new fitur //
          
          case '!pinterest':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)

           // if (isLimit(serial)) return client.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik @limit Untuk Mengecek Kuota Limit Kamu`, id)
            await limitAdd(serial)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *@pinterest [query]*\nContoh : *@pinterest paimon*', id)
            const ptrsq = body.slice(11)
            const ptrs = await axios.get('https://api.fdci.se/rep.php?gambar='+ptrsq)
            const b = JSON.parse(JSON.stringify(ptrs.data))
            const ptrs2 =  b[Math.floor(Math.random() * b.length)]
            const image = await bent("buffer")(ptrs2)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            client.sendImage(from, base64, 'ptrs.jpg', `*Pinterest*\n\n*Hasil Pencarian : ${ptrsq}*`)
            break
          case '!pornhub': {
        const argy = body.trim(' ').split('|')
        const namaph1 = argy[1]
        const namaph2 = argy[2]
        const puppeteer = require('puppeteer')
try {
	(async () => {
		const browser = await puppeteer.launch({
			headless: false,
		});
		const page = await browser.newPage();
		await page
			.goto("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", {
				waitUntil: "networkidle2"
			})
			.then(async () => {
				await page.type("#text-0", namaph1); //BUAT NAMA KE 1
				await page.type("#text-1", nama2); //BUAT NAMA KE 2
				await page.click("#submit");
				await new Promise(resolve => setTimeout(resolve, 3000));
				const element = await page.$(
					'div[class="btn-group"] > a'
					);
				const text = await (await element.getProperty("href")).jsonValue();
				const urlmp4 = ({
					url: text
				})
				client.sendFileFromUrl(from, text, id)
				browser.close();
 
			})
			.catch((err => {
				console.log(err)
				client.reply(from, 'error', id)
			}))
	})();
} catch (error) {
	console.log('error bang')
	client.reply(from, 'error', id)
}
}
			break
          case '!santet': //work
                    //if(isLimit(serial)) return
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (mentionedJidList.length === 0) return client.reply(from, 'Tag member yang mau disantet', id)
                    if (args.length === 1) return client.reply(from, 'Masukkan alasan kenapa menyantet dia!!', id)
                        const target = arg.split('|')[0]
                        const alasan = arg.split('|')[1]
                        await client.sendTextWithMentions(from, `Santet terkirim ke ${target}, Dengan alasan${alasan}`)
                        //limitAdd(serial)
                break
                case '!jadian':
                    //if(isLimit(serial)) return
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    if (!isGroupMsg) return client.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
                    const mem = groupMembers
                    const aku = mem[Math.floor(Math.random() * mem.length)];
                    const kamu = mem[Math.floor(Math.random() * mem.length)];
                    const sapa = `Cieee... @${aku.replace(/[@c.us]/g, '')} (💘) @${kamu.replace(/[@c.us]/g, '')} baru jadian nih\nBagi pj nya dong`
                    await client.sendTextWithMentions(from, sapa)
                   // limitAdd(serial)
                    break                  
                case '!tag':
                    //if(isLimit(serial)) return
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    if (!isGroupMsg) return client.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
                    if (!args.length >= 1) return await client.reply(from, 'pesan tidak boleh kosong', id) ;{
                        const text = body.slice(5)
                        const mem = groupMembers
                        const randMem = mem[Math.floor(Math.random() * mem.length)];
                        const sapa = `${text} 👉 @${randMem}`
                        await client.sendTextWithMentions(from, sapa)
                        //limitAdd(serial)
                    }
                    break      
          case '!cerpen': // ARUGAZ
           // if(isReg(obj)) return
          //  if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
        //    if (isLimit(serial)) return client.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const cerpen = await get.get('https://arugaz.herokuapp.com/api/cerpen').json()
            client.reply(from, `• *Cerpen*: ${cerpen.result}`, id)
            break
        case '!puisi': // ARUGAZ
           // if(isReg(obj)) return
          //  if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            //if (isLimit(serial)) return client.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (!isGroupMsg) return client.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            const puisi = await get.get('https://arugaz.herokuapp.com/api/puisi1').json()
            client.reply(from, `• *Puisi*: ${puisi.result}`, id)
            break
        case '!puisi2': // ARUGAZ
          // if(isReg(obj)) return
           // if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
           //if (isLimit(serial)) return client.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const puisi2 = await get.get('https://arugaz.herokuapp.com/api/puisi2').json()
            client.reply(from, `• *Puisi*: ${puisi2.result}`, id)
            break
        case '!puisi3': // ARUGAZ
           // if(isReg(obj)) return
           // if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
           // if (isLimit(serial)) return client.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const puisi3 = await get.get('https://arugaz.herokuapp.com/api/puisi3').json()
            client.reply(from, `• *Puisi*: ${puisi3.result}`, id)
            break
          case '!tanyamama':
          case '!ibumenjawab':
          case '!curhatibu':
                if(isReg(obj)) return
              if(cekumur(cekage)) return
              if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
              const raxing = args.join(' ')
              const aua = mama[Math.floor(Math.random() * (mama.length))]
              if (!raxing) client.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
              await client.sendText(from, `Pertanyaan: *${raxing}* \n\nMama Menjawab: ${aua}`)
              break
              case '!tanyapapa':
              case '!tanyabpk':
              case '!tanyaayah':
              case '!curhatayah':
                if(isReg(obj)) return
              if(cekumur(cekage)) return
              if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
              const ngre = args.join(' ')
              const jwibu = bapak[Math.floor(Math.random() * (bapak.length))]
              if (!ngre) client.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
              await client.sendText(from, `Pertanyaan: *${ngre}* \n\nAyah Mejawab: ${jwibu}`)
              break
          case '!afk':
               // if (!isRegistered) return await client.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await client.reply(from, ind.groupOnly(), id)
                if (ar[0] === 'enable') {
                    if (isAfkOn) return await client.reply(from, ind.afkOnAlready(), id)
                    addAfk(sender.id, time)
                    await client.reply(from, ind.afkOn(), id)
                } else if (ar[0] === 'disable') {
                    _afk.splice(sender.id, 1)
                    fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
                    await client.reply(from, ind.afkOff(), id)
                } else {
                    await client.reply(from, ind.wrongFormat(), id)
                }
            break
            case '!level':
                //if (!isRegistered) return await client.reply(from, ind.notRegistered(), id)
                if (!isLevelingOn) return await client.reply(from, ind.levelingNotOn(), id)
                if (!isGroupMsg) return await client.reply(from, ind.groupOnly(), id)
                const userLevel = getInfoLevel(sender.id)
                const userXp = getInfoXp(sender.id)
                if (userLevel === undefined && userXp === undefined) return await client.reply(from, ind.levelNull(), id)
                const ppLink = await client.getProfilePicFromServer(sender.id)
                if (ppLink === undefined) {
                    var pepe = errorImg
                } else {
                    var pepe = ppLink
                }
                const requiredXp = 5000 * (Math.pow(2, userLevel) - 1)
                const userId = sender.id.substring(9, 13)
                const randomHexs = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
                const randomHex = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
                const rank = new canvas.Rank()
                    .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setRankColor('#2c2f33', '#2c2f33')
                    .setCurrentXP(userXp)
                    .setRequiredXP(requiredXp)
                    .setProgressBar([randomHexs, randomHex], 'GRADIENT')
                    .setUsername(pushname)
                    .setDiscriminator(userId)
                rank.build()
                    .then(async (buffer) => {
                        canvas.write(buffer, `${pushname}.png`)
                        await client.sendFile(from, `${pushname}.png`, `${pushname}.png`, '', id)
                            .then(() => fs.unlinkSync(`${pushname}.png`))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await client.reply(from, `Error!\n${err}`, id)
                    })
            break
            case '!leveling':
                //if (!isRegistered) return await client.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await client.reply(from, ind.groupOnly(), id)
                if (!isGroupAdmins) return await client.reply(from, ind.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isLevelingOn) return await client.reply(from, ind.levelingOnAlready(), id)
                    _leveling.push(chat.id)
                    fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
                    await client.reply(from, ind.levelingOn(), id)
                } else if (ar[0] === 'disable') {
                    _leveling.splice(chat.id, 1)
                    fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
                    await client.reply(from, ind.levelingOff(), id)
                } else {
                    await client.reply(from, ind.wrongFormat(), id)
                }
            break
          /*  case '!afk':
                //if (!isRegistered) return await client.reply(from, ind.notRegistered(), id)
                if (!isGroupMsg) return await client.reply(from, ind.groupOnly(), id)
                if (ar[0] === 'enable') {
                    if (isAfkOn) return await client.reply(from, ind.afkOnAlready(), id)
                    addAfk(sender.id, time)
                    await client.reply(from, ind.afkOn(), id)
                } else if (ar[0] === 'disable') {
                    _afk.splice(sender.id, 1)
                    fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
                    await client.reply(from, ind.afkOff(), id)
                } else {
                    await client.reply(from, ind.wrongFormat(), id)
                }
            break*/
            case '!leaderboard':
               // if (!isRegistered) return await client.reply(from, ind.notRegistered(), id)
                if (!isLevelingOn) return await client.reply(from, ind.levelingNotOn(), id)
                if (!isGroupMsg) return await client.reply(from. ind.groupOnly(), id)
                const resp = _level
                resp.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '-----[ *LEADERBOARD* ]----\n\n'
                let nom = 0
                try {
                    for (let i = 0; i < 10; i++) {
                        nom++
                        leaderboard += `${nom}. @${resp[i].id.replace('@c.us', '')}\n➸ XP: *${resp[i].xp}* Level: *${resp[i].level}*\n\n`
                    }
                    await client.sendTextWithMentions(from, leaderboard)
                } catch (err) {
                    console.error(err)
                    await client.reply(from, ind.minimalDb(), id)
                }
            break
            
     /*     case '!sarah':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
          if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
          if (args.length === 1) return client.reply(from, 'Kirim perintah *_sarah [query]*\nContoh : *_sarah ZeroTwo*', id)
          const txtsarah = body.slice(7)
          const sapi = await sarahfs(txtsarah)
          await client.sendFile(from, sapi, 'ss.jpg', 'cekrek', id)
            .catch(() => {
              client.reply(from, 'Ada yang Error!', id)
            })
          break*/
          case '!daftar':  // NAMBAHIN NOMOR DI DATABASE
                argz = body.trim().split('|')
                if (argz.length >= 2) {
                const nonye = sender.id
                const namanye = argz[1]
                const umurnye = argz[2]
                    if(isNaN(umurnye)) return await client.reply(from, 'Umur harus berupa angka!!', id)
                    if(umurnye >= 40) return await client.reply(from, 'Kamu terlalu tua, kembali lagi ke masa muda untuk menggunakan Rizky Bot', id)
                    const jenenge = namanye.replace(' ','')
                    var ceknya = nonye
                        var obj = pendaftar.some((val) => {
                            return val.id === ceknya
                        })
                        if (obj === true){
                            return client.reply(from, 'kamu sudah terdaftar', id) // BAKAL RESPON JIKA NO UDAH ADA
                        } else {
                            const mentah = await client.checkNumberStatus(nonye) // PENDAFTARAN
                            const msg = monospace(`
╔════════════════════
║ *[ PENDAFTARAN BERHASIL ]*
║ *[SN]:${SN}*
╠════════════════════
║╭──❉[ *BIODATA* ]❉──
║│+ *[Nama]:${jenenge}*
║│+ *[Nomor]:wa.me/${nonye.replace('@c.us', '')}*
║│+ *[Umur]:${umurnye}*
║│+ *[Waktu]:${moment().format('HH:mm:ss')}
║│+ *[Tanggal:${moment().format('DD/MM/YY')}
║╰───────────────────
╠════════════════════
║+ *[Total]:${pendaftar.length} BIJI
╠════════════════════
║ _[TANGGAL]:${moment().format('DD/MM/YY')}_
║ _[JAM]:${moment().format('HH:mm:ss')}_
╠═════════════════════
║ ║▌│█║▌│ █║▌│█│║▌║
║ ║▌│█║▌│ █║▌│█│║▌║
║    [MAULHDC Bot]©
║ JANGAN LUPA DONATE YAHH
╚═════════════════════`)
                    const hasil = mentah.canReceiveMessage ? msg : false
                            if (!hasil) return client.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id) 
                            {
                            const register = ({
                                id: mentah.id._serialized,
                                nama: jenenge,
                                umur: umurnye
                            })
                            pendaftar.push(register)
                            fs.writeFileSync('./lib/database/user.json', JSON.stringify(pendaftar)) // DATABASE
                                client.sendTextWithMentions(from, hasil)
                            }
                        }
                    } else {
                        await client.reply(from, `Format yang kamu masukkan salah, kirim !daftar |nama|umur\n\ncontoh format:   !daftar |Rizky|20\n\ncukup gunakan nama depan/panggilan saja`, id) //if user is not registered
                    }
                    client.sendPtt(from, './media/daftar.mp3')
                break
            case '!daftarulang':
                    const nomernya = args[1]
                    let textnya = nomernya.replace(/[-\s+@c.us]/g,'')
                    const cusnya = textnya + '@c.us'
                    const umurnya = args[2]
                    if(umurnya >= 40) return await client.reply(from, 'Umur terlalu tua kak, max 40 yaa :D', id)
                        var found = false
                        Object.keys(pendaftar).forEach((i) => {
                            if(pendaftar[i].id == cusnya){
                                found = i
                            }
                        })
                        if (found !== false) {
                            pendaftar[found].umur = umurnya;
                            const updated = pendaftar[found]
                            const result = monospace(`Update data berhasil dengan SN: ${SN} pada ${moment().format('DD/MM/YY HH:mm:ss')}
₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋
[Nama]: ${updated.nama} | @${updated.id.replace(/[@c.us]/g, '')}
[Nomor]: wa.me/${updated.id.replace('@c.us', '')}
[Umur]: ${updated.umur}
⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻
Total Pengguna yang telah terdaftar ${pendaftar.length}`)
                            console.log(pendaftar[found])
                            fs.writeFileSync('./lib/database/user.json',JSON.stringify(pendaftar));
                            client.sendTextWithMentions(from, result, id)
                        } else {
                                client.reply(from, `${monospace(`Di database ngga ada nomer itu kak`)}`, id)
                        }
                break
                // Random //
          case '!randomblowjob':
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return client.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            await limitAdd(serial)
            const sblow = await axios.get('https://tobz-api.herokuapp.com/api/nsfwblowjob')
            const rblow = sblow.data
            client.sendFileFromUrl(from, rblow.result, `RandoBlow${ext}`, 'Random Blowjob!', id)
            break
            
        case '!randomhug':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const shug = await axios.get('https://tobz-api.herokuapp.com/api/hug')
            const rhug = shug.data
            client.sendFileFromUrl(from, rhug.result, `RandomHug${ext}`, 'Random Hug!', id)
            break
            
        case '!randomcry':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const scry = await axios.get('https://tobz-api.herokuapp.com/api/cry')
            const rcry = scry.data
            client.sendFileFromUrl(from, rcry.result, `RandomCry${ext}`, 'Random Cry!', id)
            await limitAdd(serial)
            break
            
        case '!randomkiss':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const skiss = await axios.get('https://tobz-api.herokuapp.com/api/kiss')
            const rkiss = skiss.data
            client.sendFileFromUrl(from, rkiss.result, `RandomKiss${ext}`, 'Random Kiss!', id)
            await limitAdd(serial)
            break
            
            case '!ttp':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if(!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
          try
          {
            const string = body.toLowerCase().includes('!ttp') ? body.slice(5) : body.slice(5)
            if (args)
            {
              if (quotedMsgObj == null)
              {
                const gasMake = await getStickerMaker(string)
                if (gasMake.status == true)
                {
                  try {
                    await client.sendImageAsSticker(from, gasMake.base64)
                  } catch (err) {
                    await client.reply(from, 'Gagal membuat.', id)
                  }
                } else {
                  await client.reply(from, gasMake.reason, id)
                }
              } else if (quotedMsgObj != null) {
                const gasMake = await getStickerMaker(quotedMsgObj.body)
                if (gasMake.status == true)
                {
                  try {
                    await client.sendImageAsSticker(from, gasMake.base64)
                  } catch (err) {
                    await client.reply(from, 'Gagal membuat.', id)
                  }
                } else {
                  await client.reply(from, gasMake.reason, id)
                }
              }
          
            } else {
              await client.reply(from, 'Tidak boleh kosong.', id)
            }
          } catch (error)
          {
            console.log(error)
          }
          break;
          case 'konichiwa':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.sendPtt(from, './media/konichiwa.mp3')
            break
          case 'tariksis':
          case 'tareksis': 
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.reply (from, '*Semongko*', id)
            client.sendPtt(from, './media/tariksis.mp3')
            break

            break
          case 'Yamete':
          case 'yamete': 
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.reply (from, '*Kudasai*', id)
            client.sendPtt(from, './media/Yamete.mp3')



            break

            break
          case 'pal pale':
          case 'pale': 
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.reply (from, '*pal pale*', id)
            client.sendPtt(from, './media/pale.mp3')

           break
          case 'Dominique':
          case 'dominik': 
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.reply (from, '*Kenik Kenik*', id)
            client.sendPtt(from, './media/dominik.mp3')

            break

            break
          case 'Aduh':
          case 'aduh': 
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.reply (from, '*Mamae*', id)
            client.sendPtt(from, './media/aduh.mp3')
            break

            break
          case 'ohayou':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.sendPtt(from, './media/ohayou.mp3')
            client.reply(from, '*Ohayou onii-chan*', id)
            break
          case 'kek':
          case 'kayak':
          case 'gimana':
          client.sendPtt(from, './media/kek.mp3')
          client.reply(from, 'Kek apa jingan\n*gomong tu yg bener*', id)
          break
          case 'paimon':
            case 'loli':
            case 'bot':
                if(isReg(obj)) return
            if(cekumur(cekage)) return
            const ratfng = args.join(' ')
            const awn = balas[Math.floor(Math.random() * (balas.length))]
            if (!ratfng) client.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await client.sendText(from, `${awn}`)
          client.sendPtt(from, './media/bot.mp3')
  // client.reply(form, '*apa jingan*')
          break
          case 'iri':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
          client.sendPtt(from, './media/iri.mp3')
          break
          case 'tapi':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
           client.sendPtt(from, './media/tapi.mp3')
           client.reply(from, '*boong*', id)
           break
          /*case 'ohayou':  if(isReg(obj)) return
            if(cekumur(cekage)) return
          case 'selamatpagi':  if(isReg(obj)) return
            if(cekumur(cekage)) return
          client.senPtt(from, './media/ohayou.mp3')
          break*/
          case '!slap':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            arg = body.trim().split(' ')
            const jejiik = client.replace('@c.us', '')
            await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
            client.sendTextWithMentions(from, `!` + jejiik + ' *slapped* ' + arg[1])
            break
        case '!hug':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
                arg = body.trim().split(' ')
                const janjing = client.replace('@c.us', '')
                await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif')
                client.sendTextWithMentions(from, '@' + janjing + ' *peyuuuk* ' + arg[1])
                break
      /*  case `!nye`:
                arg = body.trim().split('')
                const jancuk7 = author.replace('@c.us', '')
                await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/cute-baka-13LunYkkBppSBa/giphy.gif')
                client.sendTextWithMentions(from, `!` + jancuk7 +' *nye nye ' + arg[1])
                break*/
        case '!pat':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
                arg = body.trim().split(' ')
                const jartod = author.replace('@c.us', '')
                await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/Z7x24IHBcmV7W/giphy.gif')
                client.sendTextWithMentions(from, '@' + jartod + ' *👈 Si Mengelu-elus si👉* ' + arg[1])
                break
          case '!ramalpasangan':
          case 'ramal':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
          if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
          if (args.length === 1) return client.reply(from, 'Kirim perintah *@ramalpasangan [kamu|pasangan]*\nContoh : *@ramalpasangaclientbz|paimon*', id)
          arg = body.trim().split('|')
          if (arg.length >= 2) {
            client.reply(from, mess.wait, id)
            const kamu = arg[0]
            const pacar = arg[1]
            const rpmn = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn2 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn3 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn4 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn5 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn6 = rate[Math.floor(Math.random() * (rate.length))]
            const rjh2 = `*Hasil Pengamatan!*\nPasangan dengan nama ${kamu} dan ${pacar}\n\n➸ Cinta : ${rpmn}\n➸ Jodoh : ${rpmn2}\n➸ Kemiripan : ${rpmn3}\n➸ Kesukaan : ${rpmn4}\n➸ Kesamaan : ${rpmn5}\n➸ Kebucinan ${rpmn6}`
            client.reply(from, rjh2, id)
          } else {
            await client.reply(from, 'Wrong Format!', id)
          }
          break
          case '!tutup':
		      case '!close':
		          if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isOwner) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin Rizky Bot!', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            client.setGroupToAdminsOnly(groupId, true)
            break
            case '!bukagc':
		        case '!open':
		          if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isOwner) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin Rizky Bot!', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            client.setGroupToAdminsOnly(groupId, false)
            break
         /*  case '!profile':  if(isReg(obj)) return
            if(cekumur(cekage)) return
           case '!me':  if(isReg(obj)) return
            if(cekumur(cekage)) return
           if (isBanned, isBlocked) return false
           if (isGroupMsg) {
             if (!quotedMsg) {
               var block = blockNumber.includes(author)
               var bend = banned.includes(author)
               var pic = await client.getProfilePicFromServer(author)
               var namae = pushname
               var sts = await client.getStatus(author)
               var adm = isGroupAdmins
               var donate = isAdmin
               const { status } = sts
               if (pic == undefined) {
                 var pfp = errorurl
               } else {
                 var pfp = pic
               }
               await client.sendFileFromUrl(from, pfp, 'pfp.jpg', `*User Profile* ✨️ \n\n➸ *Username: ${namae}*\n\n➸ *User Info: ${status}*\n\n*➸ Block : ${block}*\n\n*➸ Banned : ${bend}*\n\n➸ *Admin Group: ${adm}*\n\n➸ *Admin paimon: ${donate}*`)
             } else if (quotedMsg) {
               var qmid = quotedMsgObj.sender.id
               var block = blockNumber.includes(qmid)
               var bend = banned.includes(author)
               var pic = await client.getProfilePicFromServer(qmid)
               var namae = quotedMsgObj.sender.name
               var sts = await client.getStatus(qmid)
               var adm = isGroupAdmins
               var donate = isAdmin
               const { status } = sts
               if (pic == undefined) {
                 var pfp = errorurl
               } else {
                 var pfp = pic
               }
               await client.sendFileFromUrl(from, pfp, 'pfp.jpg', `*User Profile* ✨️ \n\n➸ *Username: ${namae}*\n\n➸ *User Info: ${status}*\n\n*➸ Block : ${block}*\n\n*➸ Banned : ${bend}*\n\n➸ *Admin Group: ${adm}*\n\n➸ *Admin paimon: ${donate}*`)
             }
           }
           break*/
          case '!nyimak':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
          if (!quotedMsg) return client.reply(from, 'reply pesan bot', id)
          try {
            const reader = await client.getMessageReaders(quotedMsgObj.id)
            let list = ''
            for (let pembaca of reader) {
              list += `➣ @${pembaca.id.replace(/@c.us/g,'')}\n`
            }
            client.sendTextWithMentions(from, `Ciee, Ngeread doang... Jawab boss!! Ini grup WA Boss!! bukan KORAN!!!.\n${list}`, id)
          } catch (err) {
            console.log(err)
            client.reply(from, 'Maaf, Belum ada yang membaca pesan Rizky Bot', id)
          }
          break
      /*    case '!play':  if(isReg(obj)) return
            if(cekumur(cekage)) return//silahkan kalian custom sendiri jika ada yang ingin diubah
            if (args.length == 0) return client.reply(from, 'Untuk mencari lagu dari youtube\n\nPenggunaan: !play judul lagu', id)
            axios.get(`https://arugaytdl.herokuapp.com/search?q=${body.slice(6)}`)
            .then(async (res) => {
                await client.sendFileFromUrl(from, `${res.data[0].thumbnail}`, ``, `Lagu ditemukan\n\nJudul: ${res.data[0].title}\nDurasi: ${res.data[0].duration}detik\nUploaded: ${res.data[0].uploadDate}\nView: ${res.data[0].viewCount}\n\nsedang dikirim`, id)
				rugaapi.ytmp3(`https://youtu.be/${res.data[0].id}`)
				.then(async(res) => {
					if (res.status == 'error') return client.sendFileFromUrl(from, `${res.link}`, '', `${res.error}`)
					await client.sendFileFromUrl(from, `${res.thumb}`, '', `Lagu ditemukan\n\nJudul ${res.title}\n\nSabar lagi dikirim`, id)
					await client.sendFileFromUrl(from, `${res.link}`, '', '', id)
					.catch(() => {
						client.reply(from, `URL Ini ${args[0]} Sudah pernah di Download sebelumnya. URL akan di Reset setelah 1 Jam/60 Menit`, id)
					})
				})
            })
            .catch(() => {
                client.reply(from, 'Ada yang Error!', id)
            })
            break*/
          case '!howgay':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            ;if (args.length == 0) return client.reply(from, `Untuk mengetahui seberapa gay seseorang gunakan !howgay namanya\n\nContoh: #howgay burhan`, id)
          fetch('https://raw.githubusercontent.com/MrPawNO/howgay/main/howgay.txt')
            .then(res => res.text())
            .then(body => {
              let splithowgay = body.split('\n')
              let randomhowgay = splithowgay[Math.floor(Math.random() * splithowgay.length)]
              client.reply(from, randomhowgay, id)
            })
            .catch(() => {
              client.reply(from, 'Ada yang Error!', id)
            })
          break
          case '!motivasi':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
          fetch('https://raw.githubusercontent.com/selyxn/motivasi/main/motivasi.txt')
            .then(res => res.text())
            .then(body => {
              let splitmotivasi = body.split('\n')
              let randommotivasi = splitmotivasi[Math.floor(Math.random() * splitmotivasi.length)]
              client.reply(from, randommotivasi, id)
            })
            .catch(() => {
              client.reply(from, 'Ada yang Error!', id)
            })
          break
          case '!ban':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isOwner) return client.reply(from, 'Hanya untuk admin grub🙏⚫❤💛', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                banned.push(mentionedJidList[i])
                fs.writeFileSync('./lib/banned.json', JSON.stringify(banned))
                client.reply(from, 'Succes ban target!',id)
            }
            break
        case '!unban':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isOwner) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin Rizky Bot!', id)
                let inz = banned.indexOf(mentionedJidList[0])
                banned.splice(inz, 1)
                fs.writeFileSync('./lib/banned.json', JSON.stringify(banned))
                client.reply(from, 'Unbanned User!', id)
            break
        case '!listgroup':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
                client.getAllGroups().then((res) => {
                let berhitung1 = 1
                let gc = `*This is list of group* :\n`
                for (let i = 0; i < res.length; i++) {
                    gc += `\n═════════════════\n\n*No : ${i+1}*\n*Nama* : ${res[i].name}\n*Pesan Belum Dibaca* : ${res[i].unreadCount} chat\n*Tidak Spam* : ${res[i].notSpam}\n`
                }
                client.reply(from, gc, id)
            })
            break
        case '!listbanned':
            if(isReg(obj)) return
          if(cekumur(cekage)) return
          if (!isGroupMsg) client.reply (from, 'perintah hanya untuk grub', id)
            let bened = `This is list of banned number\nTotal : ${banned.length}\n`
            for (let i of banned) {
                bened += `➸ ${i.replace(/@c.us/g,'')}\n`
            }
            await client.reply(from, bened, id)
            break
          case '!kapankah':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const when = args.join(' ')
            const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
            if (!when) client.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await client.sendText(from, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`)
            break
             // new rate
        case '!berapa':
        case '!berapakali':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const ratvng = args.join(' ')
            const awc = berapa[Math.floor(Math.random() * (berapa.length))]
            if (!ratvng) client.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await client.sendText(from, `Pertanyaan: *${ratvng}* \n\nJawaban: ${awc}\n\n 'Itu adalah fakta`)
            break
        case '!ratecantik':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
        if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
        const ratong = args.join(' ')
        const awu = rate[Math.floor(Math.random() * (rate.length))]
        if (!ratong) client.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
        await client.sendText(from, `Pertanyaan: *${ratong}* \n\nJawaban: ${awu}\n\n nee-San cantik lah`)
        break
        case '!rateganteng':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
        if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
        const ganten = args.join(' ')
        const aws = rate[Math.floor(Math.random() * (rate.length))]
        if (!ganten) client.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
        await client.sendText(from, `Pertanyaan: *${ganten}* \n\nJawaban: ${aws} ganteng lah`)
        break
        case '!rategay':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
        if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
        const ranting = args.join(' ')
        const aqr = rate[Math.floor(Math.random() * (rate.length))]
        if (!ranting) client.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
        await client.sendText(from, `Pertanyaan: *${ranting}* \n\nJawaban: ${aqr}\n\n*Awas jaga tytyd klean*`)
        break
        case '!nilai':
        case '!rate':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const rating = args.join(' ')
            const awr = rate[Math.floor(Math.random() * (rate.length))]
            if (!rating) client.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await client.sendText(from, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`)
            break
        case '!apakah':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const nanya = args.join(' ')
            const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
            if (!nanya) client.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await client.sendText(from, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`)
            break
         case '!bisakah':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const bsk = args.join(' ')
            const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
            if (!bsk) client.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await client.sendText(from, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`)
            break
          case '!stickertoimg':
          case '!image':
          case '!toimg':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
          if (quotedMsg && quotedMsg.type == 'sticker') {
            const mediaData = await decryptMedia(quotedMsg)
            client.reply(from, '[SABAR] Sedang di proses⏳ silahkan tunggu!', id)
            const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
            await client.sendFile(from, imageBase64, 'imagesticker.jpg', 'FOTO nya kak!', id)
          } else if (!quotedMsg) return client.reply(from, 'Mohon tag sticker yang ingin dijadikan gambar!', id)
          break
          case '!getss':
          case '!getses':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
          if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner Rizky Bot', id)
          const sesPic = await client.getSnapshot()
          client.sendFile(from, sesPic, 'session.png', 'Nih SAYANG!', id)
          break
          case '!say':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
          if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
          
     //     client.sendPtt(from, './media/bot.mp3', id)
          const doto = fs.readFileSync('./lib/say.json')
          const dotoJson = JSON.parse(doto)
          const rondIndox = Math.floor(Math.random() * dotoJson.length)
          const rondKoy = dotoJson[rondIndox]
          client.reply(from, rondKoy, id)
          break
          case '!edotensei':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Fitur untuk menghapus member lalu menambahkan member kembali,kirim perintah *#edotensei @tagmember*', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return client.reply(from, mess.error.Ki, id)
                if (ownerNumber.includes(mentionedJidList[i])) return client.reply(from, mess.error.Ki, id)
                await client.removeParticipant(groupId, mentionedJidList[i])
                await sleep(3000)
                await client.addParticipant(from,`${mentionedJidList}`)
            } 
            break
            case '!addsay':
            if(isReg(obj)) return
            if(cekumur(cekage)) retur
            if (args.length == 1) return client.reply(from, `Kirim perintah *${prefix}addsay [teks]*, contoh *!addsay bapak kau*`, id)
            const says = body.slice(8) 
            say.push(says)
            fs.writeFileSync('./lib/say.json', JSON.stringify(say))
            client.reply(from, `Add ${says} sukses!`,id)
            break
          /*case '!addsay':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
          if (args.length == 1) return client.reply(from, `Kirim perintah *_addsay [teks]*, contoh *_addsay anjay*`, id)
          const says = body.slice(8)
          say.push(says)
          fs.writeFileSync('./lib/say.json', JSON.stringify(say))
          client.reply(from, `Add ${says} sukses!`, id)
          break*/
          case '!delsay':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
          if (args.length == 1) return client.reply(from, `Kirim perintah *_delsay [teks]*, contoh *_delsay anjay*`, id)
          const sayso = body.slice(8)
          let delsayso = say.indexOf(sayso)
          say.splice(delsayso, 1)
          fs.writeFileSync('./lib/say.json', JSON.stringify(say))
          client.reply(from, `Delete ${sayso} sukses!`, id)
          break
          case '!listsay':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
          let saylist = `This is list of Say\nTotal : ${say.length}\n`
          for (let i of say) {
            saylist += `➸ ${i.replace(/@c.us/g,'')}\n`
          }
          await client.reply(from, saylist, id)
          break
          case '!resetsay':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
          if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner ZEROTWO!', id)
          if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
          say.splice(chat.id)
          fs.writeFileSync('./lib/say.json', JSON.stringify(say))
          client.reply(from, 'Say Berhasil Direset!', id)
          break
         case '!ping':  if(isReg(obj)) return
            if(cekumur(cekage)) return
          case '#speed':
            if(cekumur(cekage)) return
          const loadedMsg = await client.getAmountOfLoadedMessages()
          const chatIds = await client.getAllChatIds()
          const groups = await client.getAllGroups()
          const me = await client.getMe()
          const battery = await client.getBatteryLevel()
          const isCharging = await client.getIsPlugged()
          await client.reply(from, `*_Penggunaan RAM:_* _${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB_ / ${Math.round(require('os').totalmem / 1024 / 1024)}MB\n_*CPU:*_ _${os.cpus()[0].model}_\n\n_*Status :*_\n- _*${loadedMsg}*_ _Loaded Messages_\n- _*${groups.length}*_ _Group Chats_\n- _*${chatIds.length - groups.length}*_ _Personal Chats_\n- _*${chatIds.length}*_ _Total Chats_\n\n*Status HP Bot*\n${(`\n*Battery :* _${battery}%_ ${isCharging ? '@Charging..._' : '@No Charging!_'}\n${Object.keys(me.phone).map(key => `*${key}* : _${me.phone[key]}_`).join('\n')}`.slice(1, -1))}\n\n\n*Speed:* _Kenceng Lah!_`, id)
          break
	        case '!stickergif': // INSTALL FFMPEG, IF YOU WANT THIS COMMAND WORK!
	        case '!stikergif': // TUTORIAL IN README, PLEASE READ!
	        case '!sgif':
	            if(isReg(obj)) return
            if(cekumur(cekage)) return // MRHRTZ
	        client.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
	        if (isMedia && type === 'video' || mimetype === 'image/gif') {
	          try {
	            const mediaData = await decryptMedia(message, uaOverride)
	            await client.sendMp4AsSticker(from, mediaData, { fps: 10, startTime: `00:00:00.0`, endTime: `00:00:30.0`, loop: 0 })
	          } catch (e) {
	            client.reply(from, `Size media terlalu besar! mohon kurangi durasi video.`)
	          }
	        } else if (quotedMsg && quotedMsg.type == 'video' || quotedMsg && quotedMsg.mimetype == 'image/gif') {
	          const mediaData = await decryptMedia(quotedMsg, uaOverride)
	          await client.sendMp4AsSticker(from, mediaData, { fps: 10, startTime: `00:00:00.0`, endTime: `00:00:30.0`, loop: 0 })
	        } else {
	          client.reply(from, 'maaf ${pushname} Kesalahan ⚠️ Hanya bisa video/gif apabila file media berbentuk gambar ketik !stickergif', id)
	        }
	        break
	 /*   case '!stickernobg':  if(isReg(obj)) return
            if(cekumur(cekage)) return
        case '!stikernobg':  if(isReg(obj)) return
            if(cekumur(cekage)) return
        case '!nobg':  if(isReg(obj)) return
            if(cekumur(cekage)) return
	    if (isMedia) {
                try {
                    var mediaData = await decryptMedia(message, uaOverride)
                    var imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    var base64img = imageBase64
                    var outFile = './media/img/noBg.png'
                    // untuk api key kalian bisa dapatkan pada website remove.bg
                    var result = await removeBackgroundFromImageBase64({ base64img, apiKey: 'rDhXg7BGrbNUBrxdHcVyfPkq', size: 'auto', type: 'auto', outFile })
                    await fs.writeFile(outFile, result.base64img)
                    await client.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                } catch(err) {
                    console.log(err)
                }
            }
            break*/
        case '!stikernobg':
        case '!nobg':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isMedia) {
            try {
                var mediaData = await decryptMedia(message, uaOverride)
                var imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                var base64img = imageBase64
                var outFile = './media/img/noBg.png'
                // untuk api key kalian bisa dapatkan pada website remove.bg
                var result = await removeBackgroundFromImageBase64({ base64img, apiKey: 'rDhXg7BGrbNUBrxdHcVyfPkq', size: 'auto', type: 'auto', outFile })
                await fs.writeFile(outFile, result.base64img)
                await client.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
              } catch (err) {
                console.log(err)
              }
            }
            break
        case '!donasi':
        case '!donate':
            client.sendLinkWithAutoPreview(from, 'https://wa.me/6288292030664', donate)
            break
        case '!tts':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!tts [id, en, jp, ar] [teks]*, contoh *!tts id halo semua*')
            const ttsId = require('node-gtts')('id')
            const ttsEn = require('node-gtts')('en')
	    const ttsJp = require('node-gtts')('ja')
            const ttsAr = require('node-gtts')('ar')
            const dataText = body.slice(8)
            if (dataText === '') return client.reply(from, 'Baka?', id)
            if (dataText.length > 500) return client.reply(from, 'Teks terlalu panjang!', id)
            var dataBhs = body.slice(5, 7)
	        if (dataBhs == 'id') {
                ttsId.save('./media/tts/resId.mp3', dataText, function () {
                    client.sendPtt(from, './media/tts/resId.mp3', id)
                })
            } else if (dataBhs == 'en') {
                ttsEn.save('./media/tts/resEn.mp3', dataText, function () {
                    client.sendPtt(from, './media/tts/resEn.mp3', id)
                })
            } else if (dataBhs == 'jp') {
                ttsJp.save('./media/tts/resJp.mp3', dataText, function () {
                    client.sendPtt(from, './media/tts/resJp.mp3', id)
                })
	    } else if (dataBhs == 'ar') {
                ttsAr.save('./media/tts/resAr.mp3', dataText, function () {
                    client.sendPtt(from, './media/tts/resAr.mp3', id)
                })
            } else {
                client.reply(from, 'Masukkan data bahasa : [id] untuk indonesia, [en] untuk inggris, [jp] untuk jepang, dan [ar] untuk arab', id)
            }
            break
            case '!magernulis1': // BY MFARELS
           //     if(isReg(obj)) return
              //  if(cekumur(cekage)) return
                if (args.length === 4) return await client.reply(from, 'Kirim Perintah *!magernulis1 --[Nama]--[Kelas]--[Teks]*\n\n*Contoh :*\n#magernulis1 --Hardianto--11.MIPA4--Subscribe HARDIATO', id) // https://github.com/MFarelS/RajinNulis-BOT
                arg = body.trim().split('--') // INSTALL IMAGEMAGICK KALO MAU WORK
                const diNama = arg[1] // INSTALL, CENTANG KOLOM 1,2,3,5,6
                const diKelas = arg[2] // SUBSCRIBE MFARELS CH
                const diTulis = arg[3] // FOLLOW INSTAGRAM @mfarelsyahtiawan
                await client.reply(from, mess.magernulissatu, id) // NAMA, KELAS, WAKTU, BY ST4RZ
                const panjangKalimat = diTulis.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangNama = diNama.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangKelas = diKelas.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangBaris = panjangKalimat.split('\n').slice(0, 30).join('\n')
                const panjangBarisNama = panjangNama.split('\n').slice(0, 30).join('\n')
                const panjangBarisKelas = panjangKelas.split('\n').slice(0, 30).join('\n')
                var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
                var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth();
                var thisDay = date.getDay(),
                    thisDay = myDays[thisDay];
                var yy = date.getYear();
                var year = (yy < 1000) ? yy + 1900 : yy;
                const waktunye = (day + ' ' + months[month] + ' ' + year)
                const harinye = (thisDay)
                spawn('convert', [
                    './mager/magernulis/magernulis1.jpg',
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+78',
                    harinye,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+102',
                    waktunye,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+100',
                    panjangBarisNama,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+120',
                    panjangBarisKelas, 
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '-7.5',
                    '-annotate',
                    '+344+142',
                    panjangBaris,
                    './mager/magernulis√/magernulis1√.jpg'
                ])
                .on('error', () => client.reply(from, 'Error Bjeer, Keknya Scriptnya Lagi Error', id))
                .on('exit', () => {
                    client.sendImage(from, './mager/magernulis√/magernulis1√.jpg', 'FarelZahra.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : Venom gaming*\n*Instagram : @ff.rizkygans1*\n*Twitter : -*\n*GitHub : Kiki1928*\n*Saweria :https://saweria.co/pakbot *\n\n*© Powered By Rizky BOT✓*', id)
                })
                break
        case '!nulis':  if(isReg(obj)) return
            if(cekumur(cekage)) return
        if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
        if (args.length === 1) return client.reply(from, 'Kirim perintah *@nulis [teks]*, contoh *@nulis aku bukan boneka*', id)
        const ngettik = body.slice(7)
        const ngetikk = await axios.get('https://tobz-api.herokuapp.com/api/nulis?text='+ ngettik)
        if (ngetikk.data.error) return client.reply(from, ngetikk.data.error, id)
        client.sendFileFromUrl(from, ngetikk.data.result, 'nulis.jpg', '', id)
        break 
     /*   case '!nulis':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!nulis [teks]*', id)
            const nulis = encodeURIComponent(body.slice(7))
            client.reply(from, mess.wait, id)
            let urlnulis = `https://tobz-api.herokuapp.com/api/nulis?text=${nulis}`
            await fetch(urlnulis, {method: "GET"})
            .then(res => res.json())
            .then(async (json) => {
                await client.sendFileFromUrl(from, json.result, 'Nulis.jpg', 'Nih anjim', id)
            }).catch(e => client.reply(from, "Error: "+ e));
            break*/
        case '!ytmp3':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!ytmp3 [linkYt]*, untuk contoh silahkan kirim perintah *!readme*')
            let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLinks) return client.reply(from, mess.error.Iv, id)
            try {
                client.reply(from, mess.wait, id)
                const resp = await get.get(`https://mhankbarbars.herokuapp.com/api/yta?url=${args[1]}&apiKey=${apiKey}`).json()
                if (resp.error) {
                    client.reply(from, resp.error, id)
                } else {
                    const { title, thumb, filesize, result } = await resp
                    if (Number(filesize.split(' MB')[0]) >= 30.00) return client.reply(from, 'Maaf durasi video sudah melebihi batas maksimal!', id)
                    client.sendFileFromUrl(from, thumb, 'thumb.jpg', `➸ *Title* : ${title}\n➸ *Filesize* : ${filesize}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                    await client.sendFileFromUrl(from, result, `${title}.mp3`, '', id).catch(() => client.reply(from, mess.error.Yt3, id))
                    //await client.sendAudio(from, result, id)
                }
            } catch (err) {
                client.sendText(ownerNumber[0], 'Error ytmp3 : '+ err)
                client.reply(from, mess.error.Yt3, id)
            }
            break
        case '!ytmp4':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!ytmp4 [linkYt]*, untuk contoh silahkan kirim perintah *!readme*')
            let isLin = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLin) return client.reply(from, mess.error.Iv, id)
            try {
                client.reply(from, mess.wait, id)
                const ytv = await get.get(`https://mhankbarbars.herokuapp.com/api/ytv?url=${args[1]}&apiKey=${apiKey}`).json()
                if (ytv.error) {
                    client.reply(from, ytv.error, id)
                } else {
                    if (Number(ytv.filesize.split(' MB')[0]) > 40.00) return client.reply(from, 'Maaf durasi video sudah melebihi batas maksimal!', id)
                    client.sendFileFromUrl(from, ytv.thumb, 'thumb.jpg', `➸ *Title* : ${ytv.title}\n➸ *Filesize* : ${ytv.filesize}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                    await client.sendFileFromUrl(from, ytv.result, `${ytv.title}.mp4`, '', id).catch(() => client.reply(from, mess.error.Yt4, id))
                }
            } catch (er) {
                client.sendText(ownerNumber[0], 'Error ytmp4 : '+ er)
                client.reply(from, mess.error.Yt4, id)
            }
            break
        case '!wiki':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!wiki [query]*\nContoh : *!wiki asu*', id)
            const query_ = body.slice(6)
            const wiki = await get.get(`https://mhankbarbars.herokuapp.com/api/wiki?q=${query_}&lang=id&apiKey=${apiKey}`).json()
            if (wiki.error) {
                client.reply(from, wiki.error, id)
            } else {
                client.reply(from, `➸ *Query* : ${query_}\n\n➸ *Result* : ${wiki.result}`, id)
            }
            break
        case '!cuaca':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca tangerang', id)
            const tempat = body.slice(7)
            const weather = await get.get(`https://mhankbarbars.herokuapp.com/api/cuaca?q=${tempat}&apiKey=${apiKey}`).json()
            if (weather.error) {
                client.reply(from, weather.error, id)
            } else {
                client.reply(from, `➸ Tempat : ${weather.result.tempat}\n\n➸ Angin : ${weather.result.angin}\n➸ Cuaca : ${weather.result.cuaca}\n➸ Deskripsi : ${weather.result.desk}\n➸ Kelembapan : ${weather.result.kelembapan}\n➸ Suhu : ${weather.result.suhu}\n➸ Udara : ${weather.result.udara}`, id)
            }
            break
        case '!fb':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!fb [linkFb]* untuk contoh silahkan kirim perintah *!readme*', id)
            if (!args[1].includes('facebook.com')) return client.reply(from, mess.error.Iv, id)
            client.reply(from, mess.wait, id)
            const epbe = await get.get(`https://mhankbarbars.herokuapp.com/api/epbe?url=${args[1]}&apiKey=${apiKey}`).json()
            if (epbe.error) return client.reply(from, epbe.error, id)
            client.sendFileFromUrl(from, epbe.result, 'epbe.mp4', epbe.title, id)
            break
        case '!creator':
        case '!owner':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.sendContact(from, '6288292030664@c.us')
            client.reply(from, '*Itu nomor Bwang jago*', id)
            break
        case '!ig':  if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!ig [linkIg]* untuk contoh silahkan kirim perintah *!readme*')
            if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return client.reply(from, mess.error.Iv, id)
            try {
                client.reply(from, mess.wait, id)
                const resp = await get.get(`https://mhankbarbars.herokuapp.com/api/ig?url=${args[1]}&apiKey=${apiKey}`).json()
                if (resp.result.includes('.mp4')) {
                    var ext = '.mp4'
                } else {
                    var ext = '.jpg'
                }
                await client.sendFileFromUrl(from, resp.result, `igeh${ext}`, '', id)
            } catch {
                client.reply(from, mess.error.Ig, id)
                }
            break
        case '!nsfw':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return client.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                nsfw_.push(chat.id)
                fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                client.reply(from, 'NSWF Command berhasil di aktifkan di group ini! kirim perintah *!nsfwMenu* untuk mengetahui menu', id)
            } else if (args[1].toLowerCase() === 'disable') {
                nsfw_.splice(chat.id, 1)
                fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                client.reply(from, 'NSFW Command berhasil di nonaktifkan di group ini!', id)
            } else {
                client.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case '!welcome':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return client.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                welkom.push(chat.id)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                client.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                client.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
            } else {
                client.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case '!nsfwmenu':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isNsfw) return
            client.reply(from, '1. !randomHentai\n2. !randomNsfwNeko', id)
            break
          case '!igstalk':
          //  if(isReg(obj)) return
         //   if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
           // if (isLimit(serial)) return client.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1)  return client.reply(from, 'Kirim perintah *#igstalk @username*\nContoh *#igstalk duar_amjay*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const istalk = await slicedArgs.join(' ')
            console.log(istalk)
            try {
            const istalk2 = await axios.get('https://tobz-api.herokuapp.com/api/stalk?username=' + istalk)
            const { Biodata, Jumlah_Followers, Jumlah_Following, Profile_pic, Jumlah_Post, Name, Username } = istalk2.data
            const istalk3 = `*User Ditemukan!*

➸ *Username:* ${Username}
➸ *Nama:* ${Name}
➸ *Bio:* ${Biodata}
➸ *Mengikuti:* ${Jumlah_Following}
➸ *Pengikut:* ${Jumlah_Followers}
➸ *Jumlah Postingan:* ${Jumlah_Post}`
            
            const pictk = await bent("buffer")(Profile_pic)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            client.sendImage(from, base64, Username, istalk3)
            } catch (err) {
             console.error(err.message)
             await client.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             client.sendText(ownerNumber, 'Igstalk Error : ' + err)
           }
          break
      /*  case '!igstalk':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1)  return client.reply(from, 'Kirim perintah *!igStalk @username*\nConntoh *!igStalk @duar_amjay*', id)
            const stalk = await get.get(`https://mhankbarbars.herokuapp.com/api/stalk?username=${args[1]}&apiKey=${apiKey}`).json()
            if (stalk.error) return client.reply(from, stalk.error, id)
            const { Biodata, Jumlah_Followers, Jumlah_Following, Jumlah_Post, Name, Username, Profile_pic } = stalk
            const caps = `➸ *Nama* : ${Name}\n➸ *Username* : ${Username}\n➸ *Jumlah Followers* : ${Jumlah_Followers}\n➸ *Jumlah Following* : ${Jumlah_Following}\n➸ *Jumlah Postingan* : ${Jumlah_Post}\n➸ *Biodata* : ${Biodata}`
            await client.sendFileFromUrl(from, Profile_pic, 'Profile.jpg', caps, id)
            break*/
        case '!infogempa':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const bmkg = await get.get(`https://mhankbarbars.herokuapp.com/api/infogempa?apiKey=${apiKey}`).json()
            const { potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map } = bmkg
            const hasil = `*${waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*\n📍 *Koordinat* : *${koordinat}*`
            client.sendFileFromUrl(from, map, 'shakemap.jpg', hasil, id)
            break
        case '!anime':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!anime [query]*\nContoh : *!anime darling in the franxx*', id)
            const animek = await get.get(`https://mhankbarbars.herokuapp.com/api/kuso?q=${body.slice(7)}&apiKey=${apiKey}`).json()
            if (animek.error) return client.reply(from, animek.error, id)
            const res_animek = `Title: *${animek.title}*\n\n${animek.info}\n\nSinopsis: ${animek.sinopsis}\n\nLink Download:\n${animek.link_dl}`
            client.sendFileFromUrl(from, animek.thumb, 'kusonime.jpg', res_animek, id)
            break
        case '!nh':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            //if (isGroupMsg) return client.reply(from, 'Sorry this command for private chat only!', id)
            if (args.length === 2) {
                const nuklir = body.split(' ')[1]
                client.reply(from, mess.wait, id)
                const cek = await nhentai.exists(nuklir)
                if (cek === true)  {
                    try {
                        const api = new API()
                        const pic = await api.getBook(nuklir).then(book => {
                            return api.getImageURL(book.cover)
                        })
                        const dojin = await nhentai.getDoujin(nuklir)
                        const { title, details, link } = dojin
                        const { parodies, tags, artists, groups, languages, categories } = await details
                        var teks = `*Title* : ${title}\n\n*Parodies* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artists* : ${artists.join(', ')}\n\n*Groups* : ${groups.join(', ')}\n\n*Languages* : ${languages.join(', ')}\n\n*Categories* : ${categories}\n\n*Link* : ${link}`
                        //exec('nhentai --id=' + nuklir + ` -P mantap.pdf -obg ./hentong/${nuklir}.pdf --format `+ `${nuklir}.pdf`, (error, stdout, stderr) => {
                        client.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id)
                            //client.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, then(() => `${title}.pdf`, '', id)).catch(() => 
                            //client.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id))
                            /*if (error) {
                                console.log('error : '+ error.message)
                                return
                            }
                            if (stderr) {
                                console.log('stderr : '+ stderr)
                                return
                            }
                            console.log('stdout : '+ stdout)*/
                            //})
                    } catch (err) {
                        client.reply(from, '[❗] Terjadi kesalahan, mungkin kode nuklir salah', id)
                    }
                } else {
                    client.reply(from, '[❗] Kode nuClear Salah!')
                }
            } else {
                client.reply(from, '[ WRONG ] Kirim perintah *!nh [nuClear]* untuk contoh kirim perintah *!readme*')
            }
        	break
        case '!brainly':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length >= 2){
                const BrainlySearch = require('./lib/brainly')
                let tanya = body.slice(9)
                let jum = Number(tanya.split('.')[1]) || 2
                if (jum > 10) return client.reply(from, 'Max 10!', id)
                if (Number(tanya[tanya.length-1])){
                    tanya
                }
                client.reply(from, `➸ *Pertanyaan* : ${tanya.split('.')[0]}\n\n➸ *Jumlah jawaban* : ${Number(jum)}`, id)
                await BrainlySearch(tanya.split('.')[0],Number(jum), function(res){
                    res.forEach(x=>{
                        if (x.jawaban.fotoJawaban.length == 0) {
                            client.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
                        } else {
                            client.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n\n➸ *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                        }
                    })
                })
            } else {
                client.reply(from, 'Usage :\n!brainly [pertanyaan] [.jumlah]\n\nEx : \n!brainly NKRI .2', id)
            }
            break
        case '!wait':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                client.reply(from, 'Searching....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                	if (resolt.docs && resolt.docs.length <= 0) {
                		client.reply(from, 'Maaf, saya tidak tau ini anime apa', id)
                	}
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                    	teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                    }
                    teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                    teks += `➸ *Ecchi* : ${is_adult}\n`
                    teks += `➸ *Eps* : ${episode.toString()}\n`
                    teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    client.sendFileFromUrl(from, video, 'nimek.mp4', teks, id).catch(() => {
                        client.reply(from, teks, id)
                    })
                })
                .catch(() => {
                    client.reply(from, 'Error !', id)
                })
            } else {
                client.sendFile(from, './media/img/tutod.jpg', 'Tutor.jpg', 'Neh contoh mhank!', id)
            }
            break
        case '!quotemaker':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            arg = body.trim().split('|')
            if (arg.length >= 4) {
                client.reply(from, mess.wait, id)
                const quotes = encodeURIComponent(arg[1])
                const author = encodeURIComponent(arg[2])
                const theme = encodeURIComponent(arg[3])
                await quotemaker(quotes, author, theme).then(amsu => {
                    client.sendFile(from, amsu, 'quotesmaker.jpg','neh...').catch(() => {
                       client.reply(from, mess.error.Qm, id)
                    })
                })
            } else {
                client.reply(from, 'Usage: \n!quotemaker |teks|watermark|theme\n\nEx :\n!quotemaker |ini contoh|bicit|random', id)
            }
            break
        case '!linkgroup':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (isGroupMsg) {
                const inviteLink = await client.getGroupInviteLink(groupId);
                client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
            } else {
            	client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            }
            break
        case '!bc':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner Rizky Bot!', id)
            if (quotedMsg && quotedMsg.type == 'image') {
              const mediaData = await decryptMedia(quotedMsg, uaOverride)
              const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
              let msg = body.slice(4)
              const chatz = await client.getAllChatIds()
              for (let ids of chatz) {
                var cvk = await client.getChatById(ids)
                if (!cvk.isReadOnly)
                  await client.sendFile(ids, `${imageBase64}`, 'bc.jpg', `[ *Rizky Bot BroadCast* ]\n\n${msg}`)
              }
            } else {
              let msg = body.slice(4)
              const chatz = await client.getAllChatIds()
              for (let ids of chatz) {
                var cvk = await client.getChatById(ids)
                if (!cvk.isReadOnly)
                  await client.sendText(ids, `[ *Rizky Bot BroadCast* ]\n\n${msg}`)
              }
            }
            client.reply(from, 'Broadcast Success!', id)
            break
        case '!adminlist':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➸ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await client.sendTextWithMentions(from, mimin)
            break
        case '!ownergroup':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const Owner_ = chat.groupMetadata.owner
            await client.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break
        case '!mentionall':
        case '!tagall':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            const groupMem = await client.getGroupMembers(groupId)
            let hehe = '╔══✪〘 MEMBER NAK DAJJAL 〙✪══\n'
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '║│┠❥'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '╚═〘 Rizky Bot 〙'
            await client.sendTextWithMentions(from, hehe)
            break
        case '!kickall':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMem = await client.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await client.removeParticipant(groupId, allMem[i].id)
                }
            }
            client.reply(from, 'Succes kick all member', id)
            break
        case '!leaveall':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChats = await client.getAllChatIds()
            const allGroups = await client.getAllGroups()
            for (let gclist of allGroups) {
                await client.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
                await client.leaveGroup(gclist.contact.id)
            }
            client.reply(from, 'Succes leave all group!', id)
            break
        case '!clearall':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
            const allChatz = await client.getAllChats()
            for (let dchat of allChatz) {
                await client.deleteChat(dchat.id)
            }
            client.reply(from, 'Succes clear all chat!', id)
            break
        case '!add':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const orang = args[1]
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!add* 628xxxxx', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await client.addParticipant(from,`${orang}@c.us`)
            } catch {
                client.reply(from, mess.error.Ad, id)
            }
            break
        case '!kick':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', id)
            await client.sendText(from, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return client.reply(from, mess.error.Ki, id)
                await client.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case '!leave':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            await client.sendText(from,'Sayonara').then(() => client.leaveGroup(groupId))
            break
        case '!promote':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await client.promoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
        case '!demote':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
        case '!join':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if(!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner Rizky Bot', id)
            if (args.length === 1) return client.reply(from, 'Hanya Owner yang bisa memasukan Bot ke dalam Grup!', id)
            const link = body.slice(6)
            const tGr = await client.getAllGroups()
            const minMem = 5
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            const check = await client.inviteInfo(link)
            if (!isLink) return client.reply(from, 'Ini link? 👊🤬', id)
            if (tGr.length > 256) return client.reply(from, 'Maaf jumlah group sudah maksimal!', id)
            if (check.size < minMem) return client.reply(from, 'Member group tidak melebihi 30, bot tidak bisa masuk', id)
            if (check.status === 200) {
                await client.joinGroupViaLink(link).then(() => client.reply(from, 'Bot akan segera masuk!'))
            } else {
                client.reply(from, 'Link group tidak valid!', id)
            }
            break
        case '!delete':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!quotedMsg) return client.reply(from, 'Salah!!, kirim perintah *!delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return client.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
       /* case '!getses':  if(isReg(obj)) return
            if(cekumur(cekage)) return
            const sesPic = await client.getSnapshot()
            client.sendFile(from, sesPic, 'session.png', 'Neh...', id)*/
            break
        case '!lirik':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length == 1) return client.reply(from, 'Kirim perintah *!lirik [optional]*, contoh *!lirik aku bukan boneka*', id)
            const lagu = body.slice(7)
            const lirik = await liriklagu(lagu)
            client.reply(from, lirik, id)
            break
        case '!chord':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!chord [query]*, contoh *!chord aku bukan boneka*', id)
            const query__ = body.slice(7)
            const chord = await get.get(`https://mhankbarbar.herokuapp.com/api/chord?q=${query__}&apiKey=${apiKey}`).json()
            if (chord.error) return client.reply(from, chord.error, id)
            client.reply(from, chord.result, id)
            break
        case '!listdaerah':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const listDaerah = await get('https://mhankbarbar.herokuapp.com/daerah').json()
            client.reply(from, listDaerah.result, id)
            break
        case '!listblock':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `➸ @${i.replace(/@c.us/g,'')}\n`
            }
            client.sendTextWithMentions(from, hih, id)
            break
        case '!jadwalshalat':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return client.reply(from, '[❗] Kirim perintah *!jadwalShalat [daerah]*\ncontoh : *!jadwalShalat Tangerang*\nUntuk list daerah kirim perintah *!listDaerah*')
            const daerah = body.slice(14)
            const jadwalShalat = await get.get(`https://mhankbarbars.herokuapp.com/api/jadwalshalat?daerah=${daerah}&apiKey=${apiKey}`).json()
            if (jadwalShalat.error) return client.reply(from, jadwalShalat.error, id)
            const { Imsyak, Subuh, Dhuha, Dzuhur, Ashar, Maghrib, Isya } = await jadwalShalat
            arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            tgl = new Date().getDate()
            bln = new Date().getMonth()
            thn = new Date().getFullYear()
            const resultJadwal = `Jadwal shalat di ${daerah}, ${tgl}-${arrbulan[bln]}-${thn}\n\nImsyak : ${Imsyak}\nSubuh : ${Subuh}\nDhuha : ${Dhuha}\nDzuhur : ${Dzuhur}\nAshar : ${Ashar}\nMaghrib : ${Maghrib}\nIsya : ${Isya}`
            client.reply(from, resultJadwal, id)
            break
        case '!listchannel':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.reply(from, listChannel, id)
            break
        case '!jadwaltv':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!jadwalTv [channel]*', id)
            const query = body.slice(10).toLowerCase()
            const jadwal = await jadwalTv(query)
            client.reply(from, jadwal, id)
            break
        case '!jadwaltvnow':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const jadwalNow = await get.get('https://api.haipbis.xyz/jadwaltvnow').json()
            client.reply(from, `Jam : ${jadwalNow.jam}\n\nJadwalTV : ${jadwalNow.jadwalTV}`, id)
            break
          case '!shota':
           // if(isReg(obj)) return
           // if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
          //  if (isLimit(serial)) return client.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const imageToBase64 = require('image-to-base64')
            var shouta = ['shota anime','anime shota'];
            var shotaa = shouta[Math.floor(Math.random() * shouta.length)];
            var urlshot = "https://api.fdci.se/rep.php?gambar=" + shotaa;
            axios.get(urlshot)
            .then((result) => {
            var sht = JSON.parse(JSON.stringify(result.data));
            var shotaak =  sht[Math.floor(Math.random() * sht.length)];
            imageToBase64(shotaak)
            .then(
                (response) => {
            let img = 'data:image/jpeg;base64,'+response
            client.sendFile(from, img, "shota.jpg", `*SHOTA*`, id)
                    }) 
                .catch(
                    (error) => {
                        console.log(error);
                    })
            })
            break
          case '!waifu':
              if(isReg(obj)) return
            //if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const waifu = await axios.get('https://tobz-api.herokuapp.com/api/waifu')
            client.sendFileFromUrl(from, waifu.data.image, 'Waifu.jpg', `➸ Name : ${waifu.data.name}\n➸ Description : ${waifu.data.desc}\n\n➸ Source : ${waifu.data.source}`, id)
            break
            
        case '!loli':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const loli = await get.get('https://tobz-api.herokuapp.com/api/randomloli').json()
            client.sendFileFromUrl(from, loli.result, 'loli.jpeg', 'Hentai baaakaaa', id)
            break
            case 'logoninja': 
        case '!logoninja':
            //if (!isVipUser) return client.reply(from, '*Fitur Ini Khusus VIP!*\n _Daftar VIP Hanya 5k/Bulan_\n\n*Mau Daftar VIP?*\nChat Owner BOT\n_wa.me/6281220439155_ ', id)       
            //if (isLimit(serial)) return client.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis/nJika Ingin Isi Ulang Chat Owner!/nKetik #limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return client.reply(from, `Kirim perintah *!logoninja  |Teks1|Teks2*, contoh *!logoninja  |Teks1|Teks2*`, id)
            argz = body.trim().split('|')
            if (argz.length >= 3) {
                client.reply(from, 'Tinggu ya kak lagi proses', id)
                const ninja1 = argz[1]
                const ninja2 = argz[2]
                if (ninja1.length > 8) return client.reply(from, '*Teks1 Terlalu Panjang!*\n_Maksimal 8 huruf!_', id)
                if (ninja2.length > 8) return client.reply(from, '*Teks2 Terlalu Panjang!*\n_Maksimal 8 huruf!_', id) 
                client.sendFileFromUrl(from, `https://tobz-api.herokuapp.com/api/textpro?theme=ninjalogo&text1=${ninja1}&text2=${ninja2}`).json()
            //  await limitAdd(serial)
            } else {
                await client.reply(from, `Wrong Format!\n[❗] Kirim perintah *!ninja  |Teks1|Teks2*, contoh *!ninja |Rizky|Bot*`, id)
            }
            break
     /*   case '!waifu':
            if(isReg(obj)) return
            if(cekumur(cekage)) return
            const waifu = await get.get(`https://mhankbarbars.herokuapp.com/api/waifu?apiKey=${apiKey}`).json()
            client.sendFileFromUrl(from, waifu.image, 'Waifu.jpg', `➸ Name : ${waifu.name}\n➸ Description : ${waifu.desc}\n\n➸ Source : ${waifu.source}`, id)
            break*/
        case '!husbu':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const diti = fs.readFileSync('./lib/husbu.json')
            const ditiJsin = JSON.parse(diti)
            const rindIndix = Math.floor(Math.random() * ditiJsin.length)
            const rindKiy = ditiJsin[rindIndix]
            client.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
            break
        case '!randomhentai':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if (isGroupMsg) {
                if (!isNsfw) return client.reply(from, 'Command/Perintah NSFW belum di aktifkan di group ini!', id)
                const hentai = await randomNimek('hentai')
                if (hentai.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                client.sendFileFromUrl(from, hentai, `Hentai${ext}`, 'Hentai!', id)
                break
            } else {
                const hentai = await randomNimek('hentai')
                if (hentai.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                client.sendFileFromUrl(from, hentai, `Hentai${ext}`, 'Hentai!', id)
            }
        case '!randomnsfwneko':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            if(isGroupMsg) {
                if (!isNsfw) return client.reply(from, 'Command/Perintah NSFW belum di aktifkan di group ini!', id)
                const nsfwneko = await randomNimek('nsfw')
                if (nsfwneko.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                client.sendFileFromUrl(from, nsfwneko, `nsfwNeko${ext}`, 'Nsfwneko!', id)
            } else {
                const nsfwneko = await randomNimek('nsfw')
                if (nsfwneko.endsWith('.png')) {
                    var ext = '.png'
                } else {
                    var ext = '.jpg'
                }
                client.sendFileFromUrl(from, nsfwneko, `nsfwNeko${ext}`, 'Nsfwneko!', id)
            }
            break
      /*  case '!randomnekonime':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const nekonime = await get.get('https://mhankbarbars.herokuapp.com/api/nekonime').json()
            if (nekonime.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            client.sendFileFromUrl(from, nekonime.result, `Nekonime${ext}`, 'Nekonime!', id)
            break*/
        case '!randomtrapnime':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const trap = await randomNimek('trap')
            if (trap.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            client.sendFileFromUrl(from, trap, `trapnime${ext}`, 'Trapnime!', id)
            break
        case '!randomanime':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const nime = await randomNimek('anime')
            if (nime.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            client.sendFileFromUrl(from, nime, `Randomanime${ext}`, 'Randomanime!', id)
            break
            case '!randomnekonime':
          //  if(isReg(obj)) return
       //     if(cekumur(cekage)) return
            if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
           // if (isLimit(serial)) return client.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
            const nekonime = await axios.get(`https://tobz-api.herokuapp.com/api/nekonime`)
            const nekon = nekonime.data
            if (nekon.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            client.sendFileFromUrl(from, nekon.result, `Nekonime${ext}`, 'Nekonime!', id)
            //await limitAdd(serial)
            break
        case '!inu':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            client.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu')
            break
        case '!neko':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            client.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ')
            break
        case '!sendto':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.sendFile(from, './msgHndlr.js', 'msgHndlr.js')
            break
        case '!url2img':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const _query = body.slice(9)
            if (!_query.match(isUrl)) return client.reply(from, mess.error.Iv, id)
            if (args.length === 1) return client.reply(from, 'Kirim perintah *!url2img [web]*\nContoh *!url2img https://google.com*', id)
            const url2img = await get.get(`https://mhankbarbar.herokuapp.com/api/url2image?url=${_query}&apiKey=${apiKey}`).json()
            if (url2img.error) return client.reply(from, url2img.error, id)
            client.sendFileFromUrl(from, url2img.result, 'kyaa.jpg', null, id)
            break
        case '!quote':
        case '!quotes':  if(isReg(obj)) return
            if(cekumur(cekage)) return
            const quotes = await get.get('https://mhankbarbars.herokuapp.com/api/randomquotes').json()
            client.reply(from, `➸ *Quotes* : ${quotes.quotes}\n➸ *Author* : ${quotes.author}`, id)
            break
        case '!quotesnime':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const skya = await get.get('https://mhankbarbars.herokuapp.com/api/quotesnime/random').json()
            skya_ = skya.data
            client.reply(from, `➸ *Quotes* : ${skya_.quote}\n➸ *Character* : ${skya_.character}\n➸ *Anime* : ${skya_.anime}`, id)
            break
        case '!meme':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes');
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
            break
        case '!help':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.sendText(from, help)
            client.sendPtt(from, './media/help.mp3')
            break
        case '!readme':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.reply(from, readme, id)
            break
       /* case '!info':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.sendLinkWithAutoPreview(from, 'https://github.com/mhankbarbar/whatsapp-bot', info)
            break*/
        case '!snk':
              if(isReg(obj)) return
            if(cekumur(cekage)) return
            client.reply(from, snk, id)
            break
            default:
            if (!isGroupMsg) return client.reply(from, `Halooo👏 *${pushname}* Jingan\nPengen masukin bot ke grub?\nSyarat&ketentuan nya\n-wajib follow ig @ff.rizkygans1(SS+Kirim ke onwer Rizky Bot) jika sudah bot akan masuk\n-Bot harus Admin\n-jangan menghina bot\n-jangan spam berlebihan\n-join grub Rizky Bot:https://chat.whatsapp.com/Jwb64Puw1cgErIqWNP65LN\n*Thank udah udah menggunakan bot ini*`, id)
            if (command.startsWith('!')) {
                client.reply(from, `Lu ngetik apaan ${pushname}, bajingan Command lu *${args[0]}* yang ga berfaedah Tidak Terdaftar Di Dalam *!help*`, id)
            }
            await client.sendSeen(from) 
            }
    
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //client.kill().then(a => console.log(a))
    }
}
