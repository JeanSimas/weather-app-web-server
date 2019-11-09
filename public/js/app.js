showInformation = (location) => {
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((parsedData) => {
            if (parsedData.error) {
                console.log(parsedData.error)
            } else {
                console.log(parsedData.forecast, parsedData.location)
            }
        })
    })

}
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchElement.value
    showInformation(location)

})