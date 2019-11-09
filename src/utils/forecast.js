const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const urlForecast = `https://api.darksky.net/forecast/e8b73848ba0771a6c834e2a5c8d07278/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`
    request({
        url: urlForecast,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to the forecast service')
        } else if (response.body.error) {
            callback(response.body.error)
        } else {
            const data = response.body
            const currently = data.currently
            const temperature = currently.temperature
            const precipProbability = currently.precipProbability
            const daily = data.daily
            const summaryOfToday = daily.data[0].summary
            callback(undefined, `${summaryOfToday} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)

        }
    })
}

module.exports = forecast