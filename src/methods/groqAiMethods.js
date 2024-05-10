import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: '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'

})

async function main () {
  const chatCompletion = await getGroqChatCompletion()
  // Print the completion returned by the LLM.
  process.stdout.write(chatCompletion.choices[0]?.message?.content || '')
}
async function getGroqChatCompletion (events) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `Act as a senior copywritter , you write engaging posts 
        for Linkedin, Facebook and Tweeter using provided toughts/events
        through the day`
          }, {
            role: "user",
            content: `
            write  like a human . craft three engaging socila media posts tailored for
            Linkedin , Facebook and tweeter audiences.
            use simple language.
            use given time lables just to understand the order of the events,
            don't mention the time in the posts.
            Each post should creatively highlight the following events .
            Ensure the tone is conversational impactful. Focus on engaging
            the respective platform's audience, encouraging interaction,
            and driving intersert in events:

            ${events.map((event) => event.text).join(", ")}
            `
      }
    ],
    model: 'llama3-8b-8192'
  })
}
export { main, getGroqChatCompletion }
