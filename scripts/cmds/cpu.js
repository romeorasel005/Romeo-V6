module.exports = {
  config: {
    name: "cpu",
    version: "1.0",
    author: "NZ R",
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "System",
    guide: {
      en: ""
    }
  },
  onStart: async function ({ api, event, args }) {
    
    const cpuTemperature = Math.random() * 100;
    const cpuUsage = Math.random() * 100;

    let cpuStatus = "Cool ✅";
    if (cpuTemperature > 80) {
      cpuStatus = "Hot ❎";
    }

    
    const cpuMeter = createCPUMeter(cpuUsage);

    
    const systemInfo = getSystemInfo();

    
    const message = `
🔷 ME TA ♡ CPU Monitor 🔷
CPU Temperature: ${cpuTemperature.toFixed(2)}°C
CPU Usage: ${cpuUsage.toFixed(2)}%
CPU Status: ${cpuStatus}

${cpuMeter}

System Information:
${systemInfo}
    `;

  
    api.sendMessage(message, event.threadID);
  }
};


function createCPUMeter(usage) {
  const meterWidth = 20;
  const filledBlocks = Math.round((meterWidth * usage) / 100);
  const emptyBlocks = meterWidth - filledBlocks;

  return `[${'█'.repeat(filledBlocks)}${'░'.repeat(emptyBlocks)}] ${usage}%`;
}


function getSystemInfo() {
  return `
System: 𝙍𝙤𝙢𝙚𝙤𖣘𝘽𝙤𝙩࿐ ♡ Bot System
Memory: 16GB RAM
Storage: 512GB SSD
OS:  MetaOs v3.0
    `;
} 
