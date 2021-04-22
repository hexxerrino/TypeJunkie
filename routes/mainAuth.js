import express from "express"
import passport from "passport"

import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import Session from "express-session"

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

const router = express.Router()

router.use(cookieParser())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(Session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))
router.use(passport.initialize());
router.use(passport.session());

export default router