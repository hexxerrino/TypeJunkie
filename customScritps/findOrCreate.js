import UserModel from "../models/UserModel.js"

const findOrCreate = async (profile, callback) => {
    try {
        const user = await UserModel.findOne({googleId: profile.googleId}).exec();

        if (user) {return callback(null, user)}
        console.log(profile)
        const newUser = new UserModel({googleId: profile.googleId, username: profile.username, registrationDate: new Date().toString()})
        newUser.save((err) => {console.log(err)})
        callback(null, newUser)
    } catch (error) {
        callback(error, null)
    }
}

export default findOrCreate