const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const log = console.log
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 5000

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
    if(!(req.query && req.query.address)) {
        return res.send({
            error: 'Address query parameter cannot by empty'
        })
    }
    forecast(req.query.address, (error, { location, weather_description: description, curr_temp: current, feels_like_temp: feels } = {}) => {
        if(error) {
            return res.send({
                error: 'Unable to obtain weather information for '+req.query.address
            })
        }
        res.send({
            location,
            address: req.query.address,
            forecast: description+'. It is currently '+current+' degrees out. It feels like '+ feels+ ' degrees out.'
        })
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

app.listen(port, () => {
    log('Server is up and running at port '+port)
})