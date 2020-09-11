console.log('Client side javascript')

fetch('http://localhost:5000/weather?address=Boston').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})