import mongoose from "mongoose"

const userschema = new mongoose.Schema({
  profileID: {
    type: String,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
  },
  fullName: {
    type: String,
  },
  provider: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
})

const usermodel = mongoose.model("users", userschema)
usermodel.createIndexes()
export default usermodel
