const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
 usermacAddress: {
    type: String,
    required: true
 },
 username: {
     type: String
 },
 email: String
  
})



module.exports = mongoose.model("User", userSchema)