const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const app = express()
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const defaultPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(defaultPath))

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Jean Simas'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
        name: 'Jean Simas'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        message: 'This is a message to help you solve your problems',
        name: 'Jean Simas'
    })
})
app.get('/weather', (request, response) => {
    if (!request.query.address) {
        return response.send({
            error: 'You must provide an address.'
        })
    }
    geocode(request.query.address, (error, geocodeData) => {
        if (error) {
            console.log(error)
            response.send({
                error
            })
        } else {
            forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
                if (error) {
                    console.log(`Error : ${error}`)
                } else {
                    response.send({
                        forecast: forecastData,
                        location: geocodeData.location
                    })
                }
            })
        }
    })

})

app.get('/products', (request, response) => {
    if (!request.query.search) {
        return response.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(request.query.search)
    response.send({
        products: []
    })
});

app.get('/help/*', (request, response) => {
    response.render('404', {
        title: 'Page not found',
        name: 'Jean Simas',
        messageError: 'Help article not found'
    })
})
app.get('*', (request, response) => {
    response.render('404', {
        title: 'Page not found',
        name: 'Jean Simas',
        messageError: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
console.log('Access the website in http://localhost:3000')