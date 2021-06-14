const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
 usermacAddress: {
    type: String,
    required: true
 },
  title: {
    type: String,
    required: true,
  }
  
})



module.exports = mongoose.model("category", categorySchema)