const axios = require("axios");

module.exports = {
  config: {
    name: "generate",
    aliases: [`gen`],
    version: "1.0",
    author: "KinG ArYAN",
    countDown: 5,
    category: "media",
    longDescription: {
      en: 'Genreate Images using Gen API',
    },
    guide: {
      en: '.generate [ prompt ] | [ model ] '
    }
  },
  onStart: async function ({ message, api, args, event }) {
    const text = args.join(' ');
    const [prompt, model] = text.split('|').map((text) => text.trim()); // Define model here

    if (!text || !model) {
      return message.reply("⛔|𝗜𝗻𝘃𝗮𝗹𝗶𝗱 \n━━━━━━━━━━━━\n\n➤ Please provide a prompt with model");
    }
    
    const baseURL = `https://ai-technology.onrender.com/api/generate?prompt=${prompt}&model=${model}`;

   const startTime = new Date().getTime(); // Define startTime
    

    api.setMessageReaction("⏳", event.messageID, () => {}, true);
   
    const endTime = new Date().getTime(); // Move endTime inside the asynchronous block
      const timeTaken = (endTime - startTime) / 1000; 
      
    message.reply("🔎 Creating\n\n➤ Generating your image, please wait a few moments.", async (err, info) => {
      message.reply({ 
        body: `🖼️ [ 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗘 ]\n\n➤ Here is your generated image.\n➤ Time taken: ${timeTaken} seconds`,
        attachment: await global.utils.getStreamFromURL(baseURL)
      });

      let ui = info.messageID;
      message.unsend(ui);
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    });
  }
};