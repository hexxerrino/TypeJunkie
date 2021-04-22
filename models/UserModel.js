import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"

mongoose.connect(process.env.mongoDbLink, {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    googleId: String,
    username: String,
    password: String,
    scores: Array,
    averageScore: {type: Number, default: 0},
    registrationDate: String,
    numOfPlays: {type: Number, default: 0}
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema)

export default User