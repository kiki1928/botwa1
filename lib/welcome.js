const fs = require('fs-extra')

module.exports = welcome = async (client, event) => {
    //console.log(event.action)
    const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
    const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await client.getChatById(event.chat)
            const pChat = await client.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await client.getProfilePicFromServer(event.who)
            const capt = `Oiii Temme Anda member baru👋, Welcome to group *${name}* Jangan Baperan,atau keluar masuk yahh\n*_intro dlu Syank:_*
*🌺Nama:*
*🌺Umur:*
*🌺askot:*
*🌺animefav:*
*🌺toxic:iya/tidak*
*🌺sekolah:SMP/SMA.dll*
*🌺status:*
 selamat bergabung dan juga semoga betah disini.`
            if (pepe == '' || pepe == undefined) {
                await client.sendFileFromUrl(event.chat, 'https://www.linkpicture.com/q/IMG-20201217-WA0763.jpg', 'profile.jpg', capt)
            } else {
                await client.sendFileFromUrl(event.chat, pepe, 'profile.jpg', capt)
            }

        }
    } catch (err) {
        console.log(err)
    }
}
