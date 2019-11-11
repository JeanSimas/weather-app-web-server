const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


showInformation = (location) => {
    messageOne.textContent = 'Loading Forecast'
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((parsedData) => {
            if (parsedData.error) {
                messageOne.textContent = 'Error'
                messageTwo.textContent = parsedData.error
            } else {
                messageOne.textContent = parsedData.location
                messageTwo.textContent = parsedData.forecast

            }
        })
    })

}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchElement.value
    showInformation(location)

})