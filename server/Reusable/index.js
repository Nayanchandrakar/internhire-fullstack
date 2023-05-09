import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const CLIENT_URL = process.env.CLIENT_URL
export const jwtSign = (payload, expireTime) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expireTime,
  })
}

export const JwtConfig = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: true,
}

export const GoogleCLientCredentials = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/redirect",
}
