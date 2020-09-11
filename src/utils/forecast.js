const request = require('postman-request')
const encodeUrl = require('encodeurl')

const forecast = (location, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=c020501743bb6828ff05a14281e1280f&query="+ encodeUrl(location) + "&units=f"
    request(url, {json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, {
                weather_description: body.current.weather_descriptions[0],
                curr_temp: body.current.temperature,
                feels_like_temp: body.current.feelslike,
                location: body.location.name + ',' + body.location.region + ',' + body.location.country
            })
        }
    })
}

module.exports = forecast