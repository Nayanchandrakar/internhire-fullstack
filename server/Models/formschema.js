import mongoose from "mongoose"

const formschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  fullname: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
  },
  about: {
    type: String,
    requried: true,
  },
  application: {
    type: String,
    requried: true,
  },
  salary: {
    type: String,
    requried: true,
  },
  resume: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
})

const formModel = mongoose.model("forms", formschema)

export default formModel
