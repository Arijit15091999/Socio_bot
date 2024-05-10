import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    is_bot: {
      type: Boolean,
      required: true,
      default: false
    },
    first_name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },

    language_code: {
      type: String,
      required: false
    },
    prompt_token: {
      type: Number,
      required: false
    },
    completion_token: {
      type: Number,
      required: false
    }
  },
  { timestamps: true }
)

// {
//   id: 6902438415,
//   is_bot: false,
//   first_name: 'Arijit',
//   username: 'Arijit15091999',
//   language_code: 'en'
// }

const User = mongoose.model('User', userSchema)

export default User
