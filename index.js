const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!'; // Aqui é para acionar o COMANDO , EXEMPLO: !LIMPAR

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'limpar') {
    const quantidade = parseInt(args[0]);

    if (isNaN(quantidade) || quantidade <= 0 || quantidade > 100) {
      return message.reply('Por favor, forneça um número válido de mensagens para limpar (entre 1 e 100).');
    }

    message.channel.bulkDelete(quantidade + 1)
      .then(() => {
        message.channel.send(`Foram limpas ${quantidade} mensagens.`)
          .then(msg => msg.delete({ timeout: 3000 }));
      })
      .catch(error => {
        console.error('Erro ao limpar mensagens:', error);
        message.reply('Houve um erro ao tentar limpar as mensagens.');
      });
  }
});

client.login('MTE4NDU2NTIzMDIxMTE4NjgxOQ.G1JOfV.6wwuKJpcZUkbmkFQHKBF0nyDk3qXZRgBttblI0');
