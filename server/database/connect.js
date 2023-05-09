import mongoose from "mongoose"

export const ConnectMongooseFunc = async () => {
  mongoose.set("strictQuery", true)
  await mongoose.connect(process.env.MONGOOSE_URI)
}
