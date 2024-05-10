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
      },
      {
        role: 'user',
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

            ${events.map(event => event.text).join(', ')}
            `
      }
    ],
    model: 'llama3-8b-8192',
    //
    // Optional parameters
    //
    // Controls randomness: lowering results in less random completions.
    // As the temperature approaches zero, the model will become deterministic
    // and repetitive.
    temperature: 0.5,
    // The maximum number of tokens to generate. Requests can use up to
    // 2048 tokens shared between prompt and completion.
    max_tokens: 1024,
    // Controls diversity via nucleus sampling: 0.5 means half of all
    // likelihood-weighted options are considered.
    top_p: 1,
    // A stop sequence is a predefined or user-specified text string that
    // signals an AI to stop generating content, ensuring its responses
    // remain focused and concise. Examples include punctuation marks and
    // markers like "[end]".
    //
    // For this example, we will use ", 6" so that the llm stops counting at 5.
    // If multiple stop values are needed, an array of string may be passed,
    // stop: [", 6", ", six", ", Six"]
    stop: ', 6',
    // If set, partial message deltas will be sent.
    stream: true
  })
}
export { main, getGroqChatCompletion }
