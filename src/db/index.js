import mongoose from 'mongoose'
import * as User from '../modules/user.js'

function connectDB (connectionString) {
  return mongoose.connect(connectionString)
}

async function createAndUpdateUser (user) {
  return User.findOneAndUpdate(
    { id: user.id },
    { ...user },
    { upsert: true, new: true }
  )
}

export { connectDB, createAndUpdateUser }
