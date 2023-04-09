import express from 'express'
import passport from 'passport'
import dotenv from 'dotenv'
import * as passportSetup from './passportSetup.js'
import jwt from 'jsonwebtoken'

import connectDB from './DB/connection.js'
import userModel from './DB/model/User.model.js'
dotenv.config()
const app = express()
const port = 3000
app.use(express.json({}))
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize()) // to initialize passport


app.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get('/fail', (req, res) => {
    return res.json({ message: "Fail to login" })
})

app.get("/google/callback", passport.authenticate('google', { failureRedirect: '/fail' }),
    async (req, res, next) => {
        const { provider, displayName, given_name, family_name,
            email_verified, email, picture } = req.user

        if (!email_verified) {
            return res.json({ message: "In-valid google account" })
        }

        const user = await userModel.findOne({ email })
        if (user) {
            const token = jwt.sign({ id: user._id, isLoggedIn: true },  // in case of login
                 'SocialLogin')
            return res.json({ message: "Done", token , socialType:"login" })
        }

        //in case of signup
        const newUser = await userModel.create({
            userName: displayName,
            firstName: given_name,
            lastName: family_name,
            email,
            image: picture,
            confirmEmail: true,
            accountType: provider
        })
        const token = jwt.sign({ id: newUser._id, isLoggedIn: true }, 'SocialLogin')
        return res.json({ message: "Done", token  , socialType:"Register" })
    })
app.get('/', (req, res) => res.render("index.ejs"))
connectDB()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
