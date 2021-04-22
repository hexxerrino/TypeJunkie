import router from "./mainAuth.js"
import passport from "passport"
import {Strategy as LocalStrategy} from "passport-local"
import UserModel from "../models/UserModel.js"

passport.use(new LocalStrategy(UserModel.authenticate()));

router.post("/auth/local/register", function(req, res){
    if (req.body.password.length < 8) {
        const string = encodeURIComponent("Your password has to be at least 8 digits long!!!");
        return res.redirect("/register?error=" + string);
    }

    UserModel.register(new UserModel({username: req.body.username, registrationDate: new Date().toString()}), req.body.password, function(err, user){
        if(err){
            const string = encodeURIComponent(err.message);
            return res.redirect("/register?error=" + string);
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
    });
});

// router.post("/auth/local/login", passport.authenticate('local', { successRedirect: '/',
// failureRedirect: '/login',
// failureFlash: false })
// );

router.post('/auth/local/login', function(req, res, next) {
    const string = encodeURIComponent("Wrong username or password !!!");

    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login?error=' + string); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    })(req, res, next);
});