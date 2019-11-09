const request = require('request')


const geoCode = (address, callback) => {
    const urlGeoCode = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiamVhbnNpbWFzIiwiYSI6ImNrMjN6dTU2bjJhZG0zb21sOWtna3h5cjUifQ.wt_vxg212brde-R1I8TqZg&limit=1`
    request({
        url: urlGeoCode,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to the location service')
        } else if (response.body.features.length === 0) {
            callback('Unable to find the location, try another one.')
        } else {
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const location = response.body.features[0].place_name
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: location
            })
        }
    })
}

module.exports = geoCode