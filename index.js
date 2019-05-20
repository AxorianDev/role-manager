const Discord = require("discord.js");
const settings = require("./settings.json");
const client = new Discord.Client({
    fetchAllMembers: true
});

client.on("ready", function() {
    console.log(`Logged in as ${client.user.username}#${client.user.discriminator} and watching ${client.users.size} users.`);
    client.user.setActivity(`${client.users.size} Users`, {
        type: "WATCHING"
    });
});

client.on("guildMemberAdd", function(member) {
    client.user.setActivity(`${client.users.size} Users`, {
        type: "WATCHING"
    });

    const role = member.guild.roles.find(r => r.name === "Supporter");
    if (!role) return undefined;
    member.addRole(role);
});

client.on("guildMemberRemove", function() {
    client.user.setActivity(`${client.users.size} Users`, {
        type: "WATCHING"
    });
});

client.on("error", function(error) {
    console.error(`An unexpected error has occurred: ${JSON.stringify(error, null, 4)}`);
});

client.login(settings.token);