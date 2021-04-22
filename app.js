import "./env.js"

import express from "express"
import createArray from "./customScritps/createRandomArray.js"
import router from "./routes/mainAuth.js"
import UserModel from "./models/UserModel.js"
import "./routes/authGoogle.js"
import "./routes/authLocal.js"
import "./routes/profileRoute.js"

const app = express()
app.use('/', router);

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/', (req, res) => {
    let logedIn 
    req.user ? logedIn = true : logedIn = false
    res.render( 'pages/index', { textBoxContent: createArray(), logedIn: logedIn } );
})

app.get('/login', (req, res) => {
    let logedIn 
    req.user ? logedIn = true : logedIn = false

    let err = ""
    req.query.error ? err = req.query.error : err = "" 
    res.render( 'pages/login', { errorMessage: err, logedIn: logedIn } );
})

app.get('/leaderboard', async (req, res) => {
    let logedIn 
    req.user ? logedIn = true : logedIn = false

    const users = await UserModel.find({})
    users.sort((a, b) => {
        if (a.averageScore > b.averageScore) { return -1 }
        if (a.averageScore < b.averageScore) { return 1 }
        return 0
    })

    res.render( 'pages/leaderboard', { logedIn: logedIn, users: users } );
})

app.get('/info', (req, res) => {
    let logedIn 
    req.user ? logedIn = true : logedIn = false

    res.render( 'pages/info', { logedIn: logedIn } );
})

app.get('/register', (req, res) => {
    let err = ""
    req.query.error ? err = req.query.error : err = "" 
    res.render( 'pages/Register', {errorMessage: err} );
})

app.post("/", (req, res) => {
    res.redirect("/")
})



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
