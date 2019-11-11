const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


showInformation = (location) => {
    messageOne.style.color = '#aaaaaa'
    messageOne.textContent = 'Loading Forecast'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((parsedData) => {
            if (parsedData.error) {
                messageOne.style.color = '#ff1010'
                messageOne.textContent = 'Error'
                messageTwo.textContent = parsedData.error
            } else {
                messageOne.style.color = '#1099ff'

                // messageOne.style.color = '#3030255'
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