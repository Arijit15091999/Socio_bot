import Chat from '../modules/chat.js'

function uploadChat (chat) {
  return Chat.create(chat)
}

function getChats (userId) {
  Chat.find({ userId: userId }).then((events) => {console.log(events)})

}

export { uploadChat, getChats }
