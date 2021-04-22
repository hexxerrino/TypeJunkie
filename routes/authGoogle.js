import router from "./mainAuth.js"
import passport from "passport"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
// import UserModel from "../models/UserModel.js"
import findOrCreate from "../customScritps/findOrCreate.js"

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.googleClientId,
        clientSecret: process.env.googleClientSecret,
        callbackURL: "https://type-junkie.herokuapp.com/auth/google/callback"
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log(profile)
        findOrCreate({googleId: profile.id, username: profile.displayName}, (err, user) => { return cb(err, user) })
      }
    )
);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get("/auth/google/callback", passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/');
})

router.get('/auth/google/new', (req, res) => {
  res.render("pages/new")
})

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      return next();
  } else{
      res.redirect("/login");
  }
}