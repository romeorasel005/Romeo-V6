const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "upscale",
    aliases: ["ups"],
    version: "4.4",
    role: 0,
    author: "Hazeyy | Mesbah Bb'e",
    description: "( 𝚄𝚙𝚜𝚌𝚊𝚕𝚎 )",
    category: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",
    guide: "( 𝚂𝚌𝚊𝚕𝚒𝚗𝚐 𝙸𝚖𝚊𝚐𝚎𝚜 )",
    countDown: 2,
  },

  onChat: async function ({ api, event }) {
    if (!(event.body.indexOf("upscale") === 0 || event.body.indexOf("Upscale") === 0)) return;
    const args = event.body.split(/\s+/);
    args.shift();

    const pathie = __dirname + `/cache/zombie.jpg`;
    const { threadID, messageID } = event;

    const photoUrl = event.messageReply.attachments[0] ? event.messageReply.attachments[0].url : args.join(" ");

    if (!photoUrl) {
      api.sendMessage("🤖 𝙿𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚙𝚑𝚘𝚝𝚘 𝚝𝚘 𝚙𝚛𝚘𝚌𝚎𝚎𝚍 𝚞𝚙𝚜𝚌𝚊𝚕𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎𝚜.", threadID, messageID);
      return;
    }

    api.sendMessage("🕟 | 𝚄𝚙𝚜𝚌𝚊𝚕𝚒𝚗𝚐 𝙸𝚖𝚊𝚐𝚎, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝 𝚏𝚘𝚛 𝚊 𝚖𝚘𝚖𝚎𝚗𝚝..", threadID, async () => {
      try {
        const response = await axios.get(`https://hazee-upscale.replit.app/upscale?url=${encodeURIComponent(photoUrl)}&face_enhance=true`);
        const processedImageURL = response.data.hazescale;
        const img = (await axios.get(processedImageURL, { responseType: "arraybuffer" })).data;

        fs.writeFileSync(pathie, Buffer.from(img, 'binary'));

        api.sendMessage({
          body: "🔮 𝚄𝚙𝚜𝚌𝚊𝚕𝚎 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢",
          attachment: fs.createReadStream(pathie)
        }, threadID, () => fs.unlinkSync(pathie), messageID);
      } catch (error) {
        api.sendMessage(`🚫 𝙴𝚛𝚛𝚘𝚛 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎: ${error}`, threadID, messageID);
      }
    });
  },

  onStart: async function ({ api, event }) {}
};
