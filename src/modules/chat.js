import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Chat = mongoose.model('Chat', chatSchema)

export default Chat
