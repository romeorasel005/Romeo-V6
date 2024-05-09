const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "dalle3",
    aliases: ["dalle","bing","create","imagine"],
    version: "1.0",
    author: "Dipto",
    countDown: 15,
    role: 0,
    shortDescription: "Generate images powerby by Dalle3",
    longDescription: "Generate images by Unofficial Dalle3",
    category: "download",
    guide: {
      en: "{pn} prompt"
    }
  },

  onStart: async function ({ api, event, args }) {
  const prompt = event.messageReply?.body.split("dalle")[1] ||  args.join(" ");
  if (!prompt) {
   return api.sendMessage("❌| Wrong Formet .✅ | Use 17/18 years old boy/girl watching football match on tv and written Dipto and 69 on the back of his Dress , 4k",event.threadID,event.messageID);
  }
    try {
      const fff = ["14ws4apQ8TSNx1MditKm8L4nAo7t9SpYuD7q9xzy1XlZM0Um5_R8sVJJZwncIr123w1dQyflBP6bCfVQX2Fo1y47Wb2bQ-pRBpCK3Eu1Rj6PP7UaeJg08Hy0NZlGV6qhmfqB8YMaNos2PZ7RiNB4lBP1K9ytOX5eUoaokI3w74BEnY4PKhvjgiqPCL25MGUhWnbKT7S7QVThoM6CsMgm8GEm7vxpdtVCcSe4x64Vkdvs", "1sa7Nzl9zeL4YwLec_56LTmZlDZ7FhRhAdzqb6UNp7UEqIP0yea-be5AfYoyHBewzS2BS3mSFka2s-tLpQLaDVy67ooJq34JB2GKbeo9cYq5iagzPwke-8yx6VdjFRjxf4K6WMNjtIZmGq_6u_Bs9aCpRzTRJt6nQzI2qSMy42t1-wmCLblcIvn71LBZVYLPZeRCCZ9ofKQYog5xfBUILNg" ]
      const col = fff[Math.floor(Math.random() * fff.length)]
      const w = await api.sendMessage("Wait For Image Generating < 😽", event.threadID);
  
const response = await axios.get(`${global.GoatBot.config.api}/dalle?prompt=${prompt}&key=dipto008&cookies=${col}`)
      const data = response.data.imgUrls;
      if (!data || data.length === 0) {
        api.sendMessage("Empty response or no images generated.",event.threadID,event.messageID);
      }
      const diptoo = [];
      for (let i = 0; i < data.length; i++) {
        const imgUrl = data[i];
        const imgResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'dvassests', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        diptoo.push(fs.createReadStream(imgPath));
      }
      await api.unsendMessage(w.messageID);
      await api.sendMessage({
  body: `✅ | Here's Your Generated Photo<😘`,
        attachment: diptoo
      },event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      await api.sendMessage(`Generation failed!\nError: ${error.message}`,event.threadID, event.messageID);
    }
  }
}
