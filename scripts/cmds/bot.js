const fs = require("fs-extra");
const { utils } = global;

module.exports = {
  config: {
    name: "prefix",
    version: "1.4",
    author: "NTKhang",
    countDown: 5,
    role: 0,
    shortDescription: "Thay Ä‘á»•i prefix cá»§a bot",
    longDescription: "Thay Ä‘á»•i dáº¥u lá»‡nh cá»§a bot trong box chat cá»§a báº¡n hoáº·c cáº£ há»‡ thá»‘ng bot (chá»‰ admin bot)",
    category: "config",
    guide: {
      vi: "   {pn} <new prefix>: thay Ä‘á»•i prefix má»›i trong box chat cá»§a báº¡n"
        + "\n   VÃ­ dá»¥:"
        + "\n    {pn} #"
        + "\n\n   {pn} <new prefix> -g: thay Ä‘á»•i prefix má»›i trong há»‡ thá»‘ng bot (chá»‰ admin bot)"
        + "\n   VÃ­ dá»¥:"
        + "\n    {pn} # -g"
        + "\n\n   {pn} reset: thay Ä‘á»•i prefix trong box chat cá»§a báº¡n vá» máº·c Ä‘á»‹nh",
      en: "   {pn} <new prefix>: change new prefix in your box chat"
        + "\n   Example:"
        + "\n    {pn} #"
        + "\n\n   {pn} <new prefix> -g: change new prefix in system bot (only admin bot)"
        + "\n   Example:"
        + "\n    {pn} # -g"
        + "\n\n   {pn} reset: change prefix in your box chat to default"
    }
  },

  langs: {
    vi: {
      reset: "ÄÃ£ reset prefix cá»§a báº¡n vá» máº·c Ä‘á»‹nh: %1",
      onlyAdmin: "Chá»‰ admin má»›i cÃ³ thá»ƒ thay Ä‘á»•i prefix há»‡ thá»‘ng bot",
      confirmGlobal: "Vui lÃ²ng tháº£ cáº£m xÃºc báº¥t ká»³ vÃ o tin nháº¯n nÃ y Ä‘á»ƒ xÃ¡c nháº­n thay Ä‘á»•i prefix cá»§a toÃ n bá»™ há»‡ thá»‘ng bot",
      confirmThisThread: "Vui lÃ²ng tháº£ cáº£m xÃºc báº¥t ká»³ vÃ o tin nháº¯n nÃ y Ä‘á»ƒ xÃ¡c nháº­n thay Ä‘á»•i prefix trong nhÃ³m chat cá»§a báº¡n",
      successGlobal: "Ã£ thay Ä‘á»•i prefix há»‡ thá»‘ng bot thÃ nh: %1",
      successThisThread: "ÄÃ£ thay Ä‘á»•i prefix trong nhÃ³m chat cá»§a báº¡n thÃ nh: %1",
      myPrefix: "ðŸŒ Prefix cá»§a há»‡ thá»‘ng: %1\nðŸ›¸ Prefix cá»§a nhÃ³m báº¡n: %2"
    },
    en: {
      reset: "Your prefix has been reset to default: %1",
      onlyAdmin: "Only admin can change prefix of system bot",
      confirmGlobal: "Please react to this message to confirm change prefix of system bot",
      confirmThisThread: "Please react to this message to confirm change prefix in your box chat",
      successGlobal: "Changed prefix of system bot to: %1",
      successThisThread: "Changed prefix in your group chat to: %1",
      myPrefix: "Hey, 𝙍𝙤𝙢𝙚𝙤𖣘𝘽𝙤𝙩࿐ speaking!🔥\n⚙️ 𝗦𝘆𝘀𝘁𝗲𝗺 𝗣𝗿𝗲𝗳𝗶𝘅:-  %1\n🛸 𝗕𝗼𝘅 𝗖𝗵𝗮𝘁 𝗣𝗿𝗲𝗳𝗶𝘅:-  %2"
    }
  },

  onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0])
      return message.SyntaxError();

    if (args[0] == 'reset') {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.GoatBot.config.prefix));
    }

    const newPrefix = args[0];
    const formSet = {
      commandName,
      author: event.senderID,
      newPrefix
    };

    if (args[1] === "-g")
      if (role < 2)
        return message.reply(getLang("onlyAdmin"));
      else
        formSet.setGlobal = true;
    else
      formSet.setGlobal = false;

    return message.reply(args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"), (err, info) => {
      formSet.messageID = info.messageID;
      global.GoatBot.onReaction.set(info.messageID, formSet);
    });
  },

  onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, setGlobal } = Reaction;
    if (event.userID !== author)
      return;
    if (setGlobal) {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply(getLang("successGlobal", newPrefix));
    }
    else {
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      return message.reply(getLang("successThisThread", newPrefix));
    }
  },

onChat: async function ({ event, message, getLang }) {
  // List of prefixes to check


  
  // Normalize the message to lowercase for case-insensitive matching
  
  // Check if the message starts with any of the specified prefixes
    if (event.body && event.body.toLowerCase() === "bot" || event.body.toLowerCase() === "prefix"|| event.body.toLowerCase() === "romeo")
      { 
        return () => {
      return message.reply(getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)));
    };
  }
}
}