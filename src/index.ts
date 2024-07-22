import { Client, IntentsBitField, REST, Routes, TextChannel } from 'discord.js'
import { config } from 'dotenv'

config()

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

const commands = [
    {
        name: 'chao',
        description: 'Trả lời với lời chào!',
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN_LOGIN_BOT as string)

async function registerCommands() {
    try {
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID as string),
            { body: commands },
        )

        console.log('làm mới các lệnh (/)')
    } catch (error) {
        console.error(error)
    }
}
registerCommands()

client.on('ready', (c) => {
    console.log(`${c.user.tag} online`)
})

client.on('messageCreate', (message) => {
    // Chi dung bot trong kenh chat co bot
    if (message.channel instanceof TextChannel && message.channel.name === 'co_bot') {
        if (message.content === 'hi') {
            const senderName = message.author.username.replace(/\d+$/,'')
            message.reply(`Hi ${senderName} cu to!`)
            
        }
    }
})

client.login(process.env.TOKEN_LOGIN_BOT)