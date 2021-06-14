const mongoose = require('mongoose')

const connection = mongoose.connect("mongodb+srv://Dickson:Kvnkhairokaycy1@notescluster.ui0vr.mongodb.net/test?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true
}).then((db) => {
    console.log('mongoose is connected succesfully')
})
.catch(error =>{
    console.log("err", error)
})


module.exports = connection