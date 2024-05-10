import Chat from '../modules/chat.js'

function uploadChat (chat) {
  return Chat.create(chat)
}

function getChats (userId) {
  return Chat.find({ userId: userId })

}

export { uploadChat, getChats }
