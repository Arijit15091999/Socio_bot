import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import * as dotenv from 'dotenv'
import { connectDB, createAndUpdateUser } from './src/db/index.js'
import { uploadChat, getChats } from './src/methods/chat.methods.js'
import { getGroqChatCompletion } from './src/methods/groqAiMethods.js'

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(async function (ctx) {
  //   console.log(ctx)
  const from = ctx.update.message.from
  const user = await createAndUpdateUser(from)
  console.log(user)
  await ctx.reply(
    'Welcome to Social bot give me a note and I will create post for your Facebook Instagram and Linkedin'
  )
})

bot.hears('hi', async function (ctx) {
  await ctx.reply('Hey there')
  console.log(ctx.update.message.from)
})

// generate text
bot.on(message('text'), async function (ctx) {
  const from = ctx.update.message.from
  const text = ctx.update.message.text
  // upload chat into the database

  const response = await uploadChat({ userId: from.id, text });

  // console.log(response)

  // CAll Groq Ai for text generation

  // const events = await getChats(from.id);

  const chatCompletion = await getGroqChatCompletion([
    {
      id: 1,
      text:"hey send me the code for binary Search in java"
    }
  ]);

  console.log(chatCompletion.choices[0].message)

  const {message_id} = await ctx.reply('Doing things..........')
  console.log(message_id);
})
bot.on(message('sticker'), ctx => ctx.reply('👍'))
bot.help(ctx => ctx.reply('Send me a sticker'))

bot.launch(async function () {
  try {
    await connectDB(process.env.MONGODB_CONNECTION_STRING)
    console.log('Database connected')
    console.log('Bot is running...')
  } catch (err) {
    console.log(err)
  }
})
// // Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))




