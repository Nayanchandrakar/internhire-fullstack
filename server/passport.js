import googlestr from "passport-google-oauth20"
import passport from "passport"
import dotenv from "dotenv"
import pkg from "passport"
const { deserializeUser } = pkg
import usermodel from "./Models/userschema.js"
import JwtStrategy, { ExtractJwt } from "passport-jwt"
const GoogleStrategy = googlestr.Strategy
const JWTStrategy = JwtStrategy.Strategy

import {
  GoogleCLientCredentials,
  jwtSign,
  JwtConfig,
} from "./Reusable/index.js"

dotenv.config()
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let token = null
          if (req && req.cookies) {
            token = req.signedCookies["jwt"]
          }
          return token
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: true,
    },
    async (payload, done) => {
      if (Date.now() >= payload.exp * 1000) {
        return done(null, false, { message: "Token Expired" })
      }
      const user = await usermodel.findById(payload.id)
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    }
  )
)

passport.use(
  new GoogleStrategy(
    GoogleCLientCredentials,
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        profileID: profile.id,
        displayName: profile.displayName,
        profileImage: profile.photos[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        emailVerified: profile.emails[0].verified,
        fullName: profile.name.familyName || null + profile.name.givenName,
        provider: profile.provider,
      }

      try {
        let user = await usermodel.findOne({ profileID: profile.id })
        if (user) {
          const token = jwtSign({ id: user._id }, "24h")
          return done(null, token)
        } else {
          user = await usermodel.create(newUser)
          const tokenNew = jwtSign({ id: user._id }, "24h")
          await user.save()
          return done(null, tokenNew)
        }
      } catch (error) {
        console.log(error)
      }
    }
  )
)

// SerailizingUser and deserializeUser
passport.serializeUser((token, done) => {
  return done(null, token)
})

passport.deserializeUser((token, done) => {
  return done(null, token)
})
