const fs = require('fs-extra')

module.exports = left = async (client, event) => {
    //console.log(event.action)
    const left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
    const isLeft = left.includes(event.chat)
    try {
        if (event.action == 'remove' && left) {
            const gChat = await client.getChatById(event.chat)
            const pChat = await client.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await client.getProfilePicFromServer(event.who)
            const capt = `*Good Bye Beban semoga beruntung Di luar Sana Dan Selamat Tinggal di grub ${name} Semoga Panjang Umur Dan sehat selalu\n\n*Qoute:*\n_Orang Yang Sider emang lah sampah tetapi yang lebih sampah adalah orang yang keluar grub*`
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
