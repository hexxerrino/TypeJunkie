import router from "./mainAuth.js"
import UserModel from "../models/UserModel.js"


router.get('/profile', checkAuthentication, async (req, res) => {
    const user = await UserModel.findOne({ _id: req.user._id }).exec();
    res.render("pages/profile", {username: user.username, regDate: user.registrationDate, playCount: user.numOfPlays, avgScore: user.averageScore})
})

router.post('/profile', checkAuthentication, async (req, res) => {
    const user = await UserModel.findOne({ _id: req.user._id }).exec();
    user.scores.push(req.body)
    user.numOfPlays++

    let allScores = 0
    user.scores.forEach(score => {
        allScores += score.score
    });

    user.averageScore = allScores / user.scores.length
    user.save()
})

router.get('/logout', checkAuthentication, (req, res) => {
    req.logOut()
    res.redirect("/")
})

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect("/login");
    }
}
  