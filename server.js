import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import * as dotenv from 'dotenv'
import {connectDB} from "./src/db/index.js"

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(async function (ctx) {
//   console.log(ctx)
  const from = ctx.update.message.from
  await 
  await ctx.reply(
    'Welcome to Social bot give me a note and I will create post for your Facebook Instagram and Linkedin'
  )
})

bot.on(message('sticker'), ctx => ctx.reply('👍'))
bot.help(ctx => ctx.reply('Send me a sticker'))

bot.hears('hi', async function (ctx) {
    await ctx.reply('Hey there');
    console.log(ctx.update.message.from);
 })


bot.launch(async function () {
  try {
    await connectDB(process.env.MONGODB_CONNECTION_STRING);
    console.log('Database connected')
  console.log('Bot is running...')

  } catch (err) {
    console.log(err);
  }
})
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
