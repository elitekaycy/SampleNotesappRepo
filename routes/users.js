var express = require('express');
var router = express.Router();
const getmac = require('getmac');
const User = require('../model/User');

const usermac = getmac.default()

/* GET users listing. */
router.get('/', function(req, res, next) {


  User.findOne({ usermacAddress: usermac }).then(result => {
    return res.json({ result })
  })
  .catch(err => {
    return res.json({ err })
  })
});

router.post('/create', async(req, res) => {
  const { username, email } = req.body

  const myUser = await User.findOne({ usermacAddress: usermac })

  if(myUser)
  {
     User.findOneAndUpdate({ usermacAddress: usermac }, {
       usermacAddress: usermac,
       username,
       email
     }).then(result => {
       console.log("updated user", result)
       return res.json({ result })
     })
     .catch(err => {
       return res.json({ err })
     })
  }
  else {

    const newuser = new User({
      usermacAddress: usermac,
      username,
      email
    })
  
    
  
    newuser.save().then(result => {
      console.log('no user', result)
      return res.json({ result })
    })
    .catch(err => {
      return res.json({ err })
    })
  }
})

  
 



// router.post()

module.exports = router;
