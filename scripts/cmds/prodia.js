const axios = require('axios');
const path = require('path');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "prodia",
    version: "1.0",
    author: "ArYAN",
    countDown: 10,
    role: 0,
    longDescription: {
      en: "Generate an images based on user inputs"
    },
    category: "media",
    guide: {
      en: "{pn} [ prompt ]"
    }
  },

  onStart: async function ({ api, commandName, event, args }) {
    try {
      let prompt = args.join(' ');

      if (args.length > 0 && args.includes('-')) {
        const parts = args.join(' ').split('-').map(part => part.trim());
        if (parts.length === 2) {
          prompt = parts[0];
          ratio = parts[1];
        }
      }

      const response = await axios.get(`https://aryan-apis.onrender.com/api/prodia?prompt=${encodeURIComponent(prompt)}&apikey=aryan`);
      const imageUrls = response.data;

      const imgData = [];
      const numberOfImages = 4;

      for (let i = 0; i < Math.min(numberOfImages, imageUrls.length); i++) {
        const imageUrl = imageUrls[i];
        const imgResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({ body: '🖼️ 𝗣𝗥𝗢𝗗𝗜𝗔\n━━━━━━━━━━━━', attachment: imgData }, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("Invalid response ", event.threadID, event.messageID);
    }
  }
};
