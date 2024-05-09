const axios = require("axios");

module.exports = {
  config: {
    name: 'stalk',
    version: '2.5',
    author: 'ArYAN',
    countDown: 10,
    role: 0,
    longDescription: {
      en: "Get info using uid/mention/reply to a message"
    },
    category: "info",
    guide: {
      vi: "",
      en: "${pn} uid/@mention/reply"
    },
  },

  onStart: async function ({ api, event, args, userData, usersData }) {
    let id;
    if (args.join().includes('@')) {
      id = Object.keys(event.mentions)[0];
    } else {
      id = args[0] || event.senderID;
    }

    if (event.type === "message_reply") {
      id = event.messageReply.senderID;
    }

    try {
      const uid = id;

      const response = await axios.get(`https://aryan-apis.onrender.com/stalk/fb?uid=${uid}&apikey=aryan`);
      const userData = response.data;

      const name = userData.name;
      const link_profile = userData.link;
      const first_name = userData.first_name;
      // Change the format of created_time
      const created_time = new Date(userData.created_time).toLocaleDateString('en-US');
      const web = userData.website || "No website data found!";
      const gender = userData.gender || "No Gender Data found!";
      const relationship_status = userData.relationship_status || "No relationship data found!";
      const love = userData.significant_other || "No love data found!";
      const bday = userData.birthday || "No birthday data found!";
      const follower = userData.subscribers?.summary?.total_count || "No followers data found!"; 
      const is_verified = userData.is_verified;
      const quotes = userData.quotes || "No quote data found!";
      const about = userData.about || "No about data found!";
      const locale = userData.locale || "No local data found!";
      const hometown = userData.hometown?.name || "No Hometown data found!";
      const cover = userData.cover || "No Cover photo found!";
      const messageBody = `
💜 𝗙𝗮𝗰𝖾𝖻𝗈𝗈𝗄 𝗦𝘁𝗮𝗹𝗸
━━━━━━━━━━━━━━
\n𝖭𝖺𝗆𝖾: ${name}
𝖥𝗂𝗋𝗌𝗍 𝖭𝖺𝗆𝖾: ${first_name}
𝖨𝖽: ${uid}
𝖢𝗋𝖾𝖺𝗍𝗂𝗈𝗇 𝖣𝖺𝗍𝖾: ${created_time}
𝖯𝗋𝗈𝖿𝗂𝗅𝖾 𝖫𝗂𝗇𝗄: ${link_profile}
𝖦𝖾𝗇𝖽𝖾𝗋: ${gender}
𝖱𝖾𝗅𝖺𝗍𝗂𝗈𝗇𝗌𝗁𝗂𝗉 𝖲𝗍𝖺𝗍𝗎𝗌: ${relationship_status}
𝖡𝗂𝗋𝗍𝗁𝖽𝖺𝗒: ${bday}
𝖥𝗈𝗅𝗅𝗈𝗐𝖾𝗋𝗌: ${follower}
𝖨𝗌 𝖵𝖾𝗋𝗂𝖿𝗂𝖾𝖽: ${is_verified}
𝖧𝗈𝗆𝖾𝗍𝗈𝗐𝗇: ${hometown}
𝖫𝗈𝖼𝖺𝗅𝖾: ${locale}
━━━━━━━━━━━━━━`;

      const avatarUrl = await usersData.getAvatarUrl(uid);

      api.sendMessage({ body: messageBody, attachment: await global.utils.getStreamFromURL(avatarUrl)}, event.threadID);
    } catch (err) {
      api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
    }
  }
};
