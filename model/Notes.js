const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
 usermacAddress: {
    type: String,
    required: true
 },
  title: {
    type: String,
    required: true,
  },
  description: {
      type: String,
      required: true,
  },
  pinned: false,
  category: {
    type: String,
  },
  timeUploaded: String
  
})



module.exports = mongoose.model("Note", notesSchema)