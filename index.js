const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const app = express()
const methodOverride = require('method-override')

// Set View Engine
app.set('view engine', 'ejs')

//Set Middleware
app.use(ejsLayouts)
app.use(express.urlencoded({extended:false})) //for the request body in the form
app.use(methodOverride('_method'))

//Set Controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))
app.use('/home', require('./controllers/home'))


//Set Main Route
app.get('/', (req,res) => {
    res.redirect('/home')
})

app.listen(3000, () => {
    console.log('Application is listening on port: 3000')
})