const express = require('express')
const router = express.Router()

//filesystem core module
const fs = require('fs')


// displays all prehistoric creatures
router.get('/',(req,res)=>{
    let dinosaurs = fs.readFileSync('./prehistoric_creatures.json')
    let dinoData = JSON.parse(dinosaurs);
    // console.log(dinoData)
    res.render('prehistoric_creatures/preIndex', {myDinos: dinoData})
    
})

//shows a form for adding a new prehistoric creature
router.get('/new', (req, res) =>{
    res.render('prehistoric_creatures/preNew')

})

//displays the type and photo of a particular prehistoric creature (id = 1)
router.get('/:id', (req, res) =>{
    let dinosaurs = fs.readFileSync('./prehistoric_creatures.json')
    let dinoData = JSON.parse(dinosaurs)
    let dinoIndex = parseInt(req.params.id)
    res.render('prehistoric_creatures/preShow', {myDinos: dinoData[dinoIndex]})
})

//Adding new creaters to the json file
router.post('/', (req, res) =>{
    console.log('This is the Request Body: ', req.body)
    let dinosaurs = fs.readFileSync('./prehistoric_creatures.json')
    let dinoData = JSON.parse(dinosaurs) //convert it into js object
    //req.body comes from the form.
    dinoData.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(dinoData))
    res.redirect('/prehistoric_creatures')
})

//Delete the data
router.delete('/:id', (req, res)=>{
    console.log('This is my Req Param Object', req.params)
    let dinosaurs = fs.readFileSync('./prehistoric_creatures.json')
    let dinoData =JSON.parse(dinosaurs)

    dinoData.splice(req.params.id, 1)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(dinoData))

    res.redirect('/prehistoric_creatures')
})

//The Edit page 
router.get('/edit/:id', (req, res) =>{
    //Grab dino data
    let dinosaurs = fs.readFileSync('./prehistoric_creatures.json')
    let dinoData = JSON.parse(dinosaurs)

    //Display edit page
    res.render('prehistoric_creatures/preEdit', {dino: dinoData[req.params.id], dinoId: req.params.id})
})

//Edit the data
router.put('/:dinoId', (req, res)=>{
    //Grab all Dino data
    let dinosaurs = fs.readFileSync('./prehistoric_creatures.json')
    //Parse JSON data into JS Object VVVV
    let dinoData = JSON.parse(dinosaurs)

    //update our dinosaurs with form data
    dinoData[req.params.dinoId].name = req.body.name
    dinoData[req.params.dinoId].type = req.body.type

    //update our json filr with new data
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(dinoData))

    //redirect to home page
    res.redirect('/prehistoric_creatures')
})

module.exports = router