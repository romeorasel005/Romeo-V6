const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: 'lyrics',
    version: '2.0',
    author: 'ArYAN',
    role: 0,
    category: 'music',
    longDescription: {
      en: 'Get any songs lyrics',
    },
    guide: {
      en: '{p}lyrics [ Song Name ]',
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
      const songName = args.join(" ");
      if (!songName) {
        api.sendMessage(`⛔ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗮𝗴𝗲\n━━━━━━━━━━\n\nPlease provide a song name!`, event.threadID, event.messageID);
        return;
      }

      const apiUrl = `https://aryan-apis.onrender.com/api/lyrics?songName=${encodeURIComponent(songName)}&apikey=aryan`;
  
   const response = await axios.get(apiUrl);
      const { lyrics, title, artist, image } = response.data;

      if (!lyrics) {
        api.sendMessage(`⛔ 𝗡𝗼𝘁 𝗙𝗼𝘂𝗻𝗱\n━━━━━━━━━━\n\nSorry, lyrics ${songName} not found, please provide another song name!`, event.threadID, event.messageID);
        return;
      }

      let message = `ℹ️ 𝗟𝘆𝗿𝗶𝗰𝘀 𝗧𝗶𝘁𝗹𝗲\n➤ ${title}\n👑 𝗔𝗿𝘁𝗶𝘀𝘁\n➤ ${artist}\n\n✅ 𝗛𝗘𝗥𝗘 𝗜𝗦 𝗬𝗢𝗨𝗥 𝗟𝗬𝗥𝗜𝗖𝗦\n━━━━━━━━━━━━━━━\n${lyrics}\n\n━━━━━━𝗘𝗡𝗗━━━━━━━`;
      let attachment = await global.utils.getStreamFromURL(image);
      api.sendMessage({ body: message, attachment }, event.threadID, (err, info) => {
        let id = info.messageID;
      });
    } catch (error) {
      console.error(error);
      api.sendMessage(`⛔ 𝗡𝗼𝘁 𝗙𝗼𝘂𝗻𝗱\n━━━━━━━━━━\n\nSorry, lyrics not found, please provide another song name!`, event.threadID, event.messageID);
    }
  },
};
