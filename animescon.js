//--------<Bibliotecas>--------------//
const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require('enmap');
//----------------------------------//

//-----------<Variaveis>-----------------//
const client = new Discord.Client();
const config = require('./config.json');
client.config = config;
const regdb = require("./database/regdatabase.js");
const reg = JSON.parse(fs.readFileSync("./database/registrados.json", "utf8"));
client.database = regdb;
client.registrados = reg;
//--------------------------------------//

//--------------------------<Eventos>--------------------------//
fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const event = require(`./eventos/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
     delete require.cache[require.resolve(`./eventos/${file}`)];
    });
});
//-------------------------------------------------------------//

//--------------------------<Comandos>---------------------//
client.commands = new Enmap();
fs.readdir("./comandos/", (err, files) => {
  
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./comandos/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Lendo o comando: ${commandName} | 👌`);
    client.commands.set(commandName, props);
  });
});
//--------------------------------------------------------//

client.login(client.config.token);