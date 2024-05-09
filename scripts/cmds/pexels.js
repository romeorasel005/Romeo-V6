const axios = require("axios");
const path = require("path");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "pexels",
    aliases: ["px"],
    version: "1.0",
    author: "rehat-- & ArYAN",//API by Aryan Chauhan
    role: 0,
    countDown: 0,
    longDescription: {
      en: "This command allows you to search for images on Pexels based on a given query and fetch a specified number of images."
    },
    category: "media",
    guide: {
      en: "{pn} <search query> <number of images>\nExample: {pn} tomozaki -5"
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const keySearch = args.join(" ");
      if (!keySearch.includes("-")) {
        return api.sendMessage(
          "Please enter the search query and number of images.",
          event.threadID,
          event.messageID
        );
      }
      const keySearchs = keySearch.substr(0, keySearch.indexOf('-'));
      let numberSearch = parseInt(keySearch.split("-").pop()) || 9;

      const apiUrl = `https://ai-technology.onrender.com/api/pexels?query=${encodeURIComponent(
        keySearchs
      )}&keysearch=${numberSearch}`;
    
      const startTime = new Date().getTime(); // Define startTime
    

    api.setMessageReaction("⏳", event.messageID, () => {}, true);
   
    const endTime = new Date().getTime(); // Move endTime inside the asynchronous block
      const timeTaken = (endTime - startTime) / 1000; 
   

      const res = await axios.get(apiUrl);
      const data = res.data.result;
      const imgData = [];

      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i], {
          responseType: "arraybuffer"
        });
        const imgPath = path.join(__dirname, "cache", `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

    api.setMessageReaction("✅", event.messageID, () => {}, true);
   
      await api.sendMessage({
        body: `Here are the top results of the query "${keySearchs}" from Pexels\nTime taken: ${timeTaken} seconds`,
        attachment: imgData,
      }, event.threadID, event.messageID);
    
   
      await fs.remove(path.join(__dirname, "cache"));
    } catch (error) {
      console.error(error);
      return api.sendMessage(
        `An error occurred.`,
        event.threadID,
        event.messageID
      );
    }
  }
};