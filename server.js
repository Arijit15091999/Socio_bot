import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import * as dotenv from 'dotenv'
import { connectDB, createAndUpdateUser } from './src/db/index.js'
import { uploadChat, getChats } from './src/methods/chat.methods.js'
import { getGroqChatCompletion } from './src/methods/groqAiMethods.js'
import User from './src/modules/user.js'

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

bot.command('generate', async function (ctx) {
  const { message_id } = await ctx.reply('👍')
  const from = ctx.update.message.from

  // CAll Groq Ai for text generation

  try {
    const events = await getChats(from.id)

    // console.log('events: ', events)

    const chatCompletion = await getGroqChatCompletion(events)

    User.findOneAndUpdate(
      { userId: from.id },
      {
        $inc: {
          prompt_tokens: chatCompletion.usage.prompt_tokens,
          completion_tokens: chatCompletion.usage.completion_tokens
        }
      }
    )

    console.log(chatCompletion.choices[0].message.content + '')
    bot.removeMessage(message_id)
    await ctx.reply(chatCompletion.choices[0].message.content)
  } catch (err) {
    console.log(err)
  }
})

// generate text
bot.on(message('text'), async function (ctx) {
  await ctx.reply('👍 ok keep me updated about your jobs...... ')

  const from = ctx.update.message.from
  const text = ctx.update.message.text
  // upload chat into the database

  await uploadChat({ userId: from.id, text })

  // console.log('response: ', response)
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
