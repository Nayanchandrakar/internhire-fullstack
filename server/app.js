import express from "express"
const app = express()
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import { ConnectMongooseFunc } from "./database/connect.js"
import "./passport.js"
import authroute from "./Routes/authroute.js"
import passport from "passport"
const port = process.env.PORT || 3000
import cookieParser from "cookie-parser"
import session from "express-session"
import fileUpload from "express-fileupload"
import http from "http"

dotenv.config()
setInterval(() => {
  http.get(process.env.CLIENT_URL)
}, 300000)
app.use(express.json())
app.use(
  fileUpload({
    useTempFiles: true,
  })
)
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET,
  })
)
app.use(cookieParser(process.env.JWT_SECRET))
app.use(bodyParser.urlencoded({ extended: true }))

// Using Cors for preventing cors error
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)

// Initializing Routes
app.use(passport.initialize())
app.use(passport.session())
app.use("/auth", authroute)

// Connecting Express Server with mongodb mongoose
const MongooseConnect = () => {
  try {
    ConnectMongooseFunc()
    app.listen(port, () => {
      console.log(`Mongoose Connected http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

MongooseConnect()
