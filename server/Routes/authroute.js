import express from "express"
import passport from "passport"
const router = express.Router()
import usermodel from "../Models/userschema.js"
import { JwtConfig } from "../Reusable/index.js"
import formModel from "../Models/formschema.js"
import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
const CLIENT_URL = process.env.CLIENT_URL


dotenv.config()

// CLOUDINARY CONFING FILE
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

// GOOGLE STRATEGIES
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)
router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.cookie("jwt", req.user, JwtConfig)
    return res.redirect(CLIENT_URL)
  }
)

// LOGING OUT THE USER FROM THE SERVER
router.get("/logout", (req, res) => {
  res.cookie("jwt", undefined, null)
  req.logout()
  res.redirect("/")
})

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    return res.json(req.user)
  }
)

router.post(
  "/form/v1",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const file = req.files.resume
    const { fullname, email, about, application, salary } = req.body

    const fileurl = await cloudinary.uploader.upload(
      file.tempFilePath,
      (err, result) => {
        if (err) {
          return res.status(200).json("An error occured from cloudinary")
        } else {
          return result
        }
      }
    )

    try {
      const id = req?.user?.id
      let form = await formModel.findOne({ user: id })

      if (form) {
        return res.status(200).json("Applied Succefully")
      } else {
        form = await formModel.create({
          user: req.user.id,
          fullname,
          email,
          about,
          application,
          salary,
          resume: fileurl.url,
        })
        await form.save()
        return res.status(200).json(form)
      }
    } catch (error) {
      console.log(error)
    }
  }
)

router.get(
  "/verify/v1",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id = req?.user?.id
    try {
      const checkForm = await formModel.findOne({ user: id })
      if (checkForm) {
        return res.status(200).json({
          message: "Applied Succefully",
          applicationStatus: true,
          data: checkForm,
        })
      } else {
        return res.status(200).json({
          message: "No application found",
          applicationStatus: false,
          data: null,
        })
      }
    } catch (error) {}
  }
)

router.put(
  "/form/v1/update",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { fullname, email, about, application, salary, resume } = req.body
    try {
      const newuser = {}
      newuser.fullname = fullname
      newuser.email = email
      newuser.about = about
      newuser.application = application
      newuser.salary = salary
      newuser.resume = resume

      const id = req?.user?.id
      const modifiedData = await formModel.findByIdAndUpdate(
        id,
        { $set: newuser },
        { new: true }
      )
      return res.status(200).json({ statusEdited: true })
    } catch (error) {
      console.log(error)
    }
  }
)

export default router
