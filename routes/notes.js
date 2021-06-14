var express = require('express');
const getmac = require('getmac');
const Category = require('../model/Category');
var router = express.Router();

const Notes = require('../model/Notes')
const usermac = getmac.default()

/* GET home page. */


/* get all notes */
router.get('/categories/none', (req, res) => {
  
    Notes.find({usermacAddress: usermac}).then((result) => {

        res.json({ result })

    })
    .catch(err => {
        res.json({ err })
    })


})

router.post('/search', (req, res) => {
    const searchfield = req.body.query


    Notes.find({ title: { $regex: searchfield, $options: '$i' },  usermacAddress: usermac})
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.json(err)
    })
})


/* get all notes category */
router.get('/categories', (req, res) => [
    Category.find({ usermacAddress: usermac}).then((result) => {
        
        res.json({ result })

    })
    .catch(err => {
        res.json({ err })
    })
])



/* get all notes in category id */
router.get('/categories/:id', (req, res) => {
    const id = req.params.id

    Notes.find({ category: id, usermacAddress: usermac }).then(result => {
        return res.json({ result })
    })
    .catch(err => {
        return res.json(err)
    })
})



/* get specific note from category id */
router.get('/categories/:id/:note', (req, res) => {
    const {id, note } = req.params
    console.log(id, note)

    Notes.findOne({ category: id, _id: note, usermacAddress: usermac})
    .then((result) => {
        res.json({ result })
    })
    .catch(err => {
        res.json(err)
    })
})



/* update note */
router.post('/categories/:id/:note/edit', (req, res) => {
    /* update function here */
    const { note } = req.params

    Notes.findByIdAndUpdate(note, { 

        usermacAddress: usermac,
        title: req.body.title,
        description: req.body.description,
        pinned: req.body.pinned,
        category: req.body.category,
        timeUploaded: new Date(Date.now()).toUTCString()

    },
    function (err, docs) {
    if (err){
    return res.json({ err })
    }
    else{
    console.log("Updated User : ", docs);
    return res.json({ docs })
    }


})
})


router.post('/new', (req, res) => {

    const newnote = new Notes({
        usermacAddress: usermac,
        title: req.body.title,
        description: req.body.description,
        pinned: req.body.pinned,
        category: req.body.category,
        timeUploaded: new Date(Date.now()).toUTCString()

    })

    newnote.save().then(result => {
      res.json({ result })
    }) 
    .catch(err => {
        res.json({ err })
    })
     
})


/* new category */
router.post('/category/new', (req, res) => {

    const newcategory = new Category({
        usermacAddress: usermac,
        title: req.body.title,

    })

    newcategory.save().then(result => {
      res.json({ result })
    }) 
    .catch(err => {
        res.json({ err })
    })
})



/* delete note*/
router.get('/delete/:id', (req, res) => {
    const { id } = req.params

    Notes.deleteOne({ _id: id, usermacAddress: usermac })
    .then(result => {
        return res.json({ deleted: result})
    })
    .catch(err => {
        return res.json({ err })
    })
})



/* delete category */
router.get('/delete/category/:id', (req, res) => {
    const { id } = req.params

    Category.deleteOne({ _id: id, usermacAddress: usermac })
    .then(async(result) => {
      const del =  await Notes.deleteMany({ category: id })
      if(del) return res.json({ deleted: del})
    })
    .catch(err => {
        return res.json({ err })
    })
})




module.exports = router;
