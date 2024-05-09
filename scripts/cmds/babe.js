const axios = require('axios');

const Prefixes = [
    '.babe',
  'babe',
   '.girlfriend',
   '.gf',
   'girlfriend',
   'gf',
];

module.exports = {
  config: {
    name: 'babe',
    aliases: [`girlfriend`],
    version: '2.0',
    author: 'ArYAN',
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p)); 

      if (!prefix) {
        return;
      }

      const prompt = args.join(" ");

      const response = await axios.get(`https://ai-technology.onrender.com/api/babeai?prompt=${encodeURIComponent(prompt)}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const fullResponse = response.data.fullResponse;

      await api.sendMessage(fullResponse, event.threadID);

      console.log('Sent answer as a reply to user');
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
};