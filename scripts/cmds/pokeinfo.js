axios = require("axios");

module.exports = {
 config: {
    name: "pokeinfo",
    version: "1.1",
    author: "Lahatra",
    shortDescription: {
      fr: "Obtiens des infos sur un Pokémon",
    },
    longDescription: {
      fr: "Cette commande te permet d'obtenir des infos sur un Pokémon. Usage : !pokeinfo nom-du-pokemon",
    },
    category: "fun",
    guide: {
      fr: "{prefix}pokeinfo nom-du-pokemon",
    },
  },

  onStart: async function ({ api, event, args }) {
    const pokemonName = encodeURIComponent(args[0]);
    if (!pokemonName) {
      api.sendMessage("Poto, faut me donner le nom d'un Pokémon pour que je puisse te donner des infos!", event.threadID, event.messageID);
      return;
    }

    try {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const response = await axios.get(apiUrl);
      const pokemonInfo = response.data;

      const message = `
Nom : ${pokemonInfo.name}
Poids : ${pokemonInfo.weight}
Taille : ${pokemonInfo.height}
Expérience de base : ${pokemonInfo.base_experience}
Type : ${pokemonInfo.types.map((type) => type.type.name).join(", ")}
Capacités : ${pokemonInfo.abilities.map((ability) => ability.ability.name).join(", ")}
      `;

      api.sendMessage(message, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      api.sendMessage("Oops, désolé poto, j'ai pas réussi à trouver des infos sur ce Pokémon!", event.threadID, event.messageID);
    }
  },
};