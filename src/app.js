const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const app = express()

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
    console.log(request)
    response.render('help', {
        title: 'Help',
        message: 'This is a message to help you solve your problems',
        name: 'Jean Simas'
    })
})
app.get('/weather', (request, response) => {
    response.send({
        location: 'Iguaba Grande',
        forecast: 'Its 20 degress out there'
    })
})

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