const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const log = console.log
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome',
        name: 'Cigith Pillai'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Cigith Pillai'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Contact us for support',
        name: 'Cigith Pillai'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Haze. It is hot',
        location: 'San Jose',
        name: 'Cigith Pillai'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        message: 'Help article not found',
        name: 'Cigith Pillai'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        message: 'Page Not Found',
        name: 'Cigith Pillai'
    })
})

app.listen(5000, () => {
    log('Server is up and running at port 5000')
})