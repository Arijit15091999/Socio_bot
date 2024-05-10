import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import * as dotenv from 'dotenv'

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(async function (ctx) {
//   console.log(ctx)
  const from = ctx.update.message.from
  console.log('from', from)
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


bot.launch(function () {
  console.log('Bot is running...')
})
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
