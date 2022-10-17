const express = require('express')
const router = express.Router()

//Set filesystem core module
const fs = require('fs')

//Get route for dinosaurs
router.get('/',(req,res)=>{
    //Parse/Read dinosaurs.json file
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    //Convert dinosaurs.json file to an array
    let dinoData = JSON.parse(dinosaurs);
    // console.log(dinoData)
    res.render('dinosaurs/index', {myDinos: dinoData})

})

router.get('/new', (req,res)=>{
    res.render('dinosaurs/new')
})

//anything with column should be down, cause it will be confused when it comes to index
router.get('/:idx', (req,res)=>{
    //get dinosaurs
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData)
    // console.log('This is the req.params object! ',req.params)
    let dinoIndex = parseInt(req.params.idx)
    // console.log(dinoIndex)
    res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});

})

//Adding new data to the json file
router.post('/',(req, res)=>{
    console.log('This is the Request Body: ', req.body)
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) //convert it into js object
    //req.body comes from the form.
    dinoData.push(req.body)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

//Delete the data
router.delete('/:idx', (req, res)=>{
    console.log('This is my Req Param Object', req.params)
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData =JSON.parse(dinosaurs)

    dinoData.splice(req.params.idx, 1)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})

//The Edit page 
router.get('/edit/:idx', (req, res) =>{
    //Grab dino data
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //Display edit page
    res.render('dinosaurs/edit', {dino: dinoData[req.params.idx], dinoId: req.params.idx})

})

//Edit the data
router.put('/:dinoId', (req, res)=>{
    //Grab all Dino data
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    //Parse JSON data into JS Object VVVV
    let dinoData = JSON.parse(dinosaurs)

    //update our dinosaurs with form data
    dinoData[req.params.dinoId].name = req.body.name
    dinoData[req.params.dinoId].type = req.body.type

    //update our json filr with new data
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    //redirect to home page
    res.redirect('/dinosaurs')
})
module.exports = router