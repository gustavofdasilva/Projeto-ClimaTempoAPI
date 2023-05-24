const elements = {
    body: document.querySelector('body'),
    icon: document.querySelector('img'),
    temp: document.querySelector('h1'),
    city: document.querySelector('input[type=text]'),
    cityName: document.querySelector('aside'),
    info: document.querySelector('p'),
    loader: document.querySelector('.loader'),
    weatherDiv: document.querySelector('.weather')
}
//https://serpapi.com/search.json?q=<TO BE SEARCHED>&engine=google_images&ijn=0
elements.city.value = 'Tokyo' //Afim de testes

/*async function getIcon(search) {
    let icon = await fetch(`https://api.unsplash.com/search/photos?query=${search}%20icon&client_id=2VQEqLzwy2ACrrycfiHnOSa0OZtHpKndb8J67o72ggc`)
    let response = await icon.json()
    let imageUrl = response.results[0].urls.regular

    elements.icon.setAttribute('src',imageUrl)
    console.log(response, imageUrl)
}*/

async function getBgImage(search) {
    let image = await fetch(`https://api.unsplash.com/search/photos?query=${search}%20city&client_id=2VQEqLzwy2ACrrycfiHnOSa0OZtHpKndb8J67o72ggc`)
    let response = await image.json()
    let imageUrl = response.results[0].urls.regular

    elements.body.style.backgroundImage = `url(${imageUrl})`
    console.log(response, imageUrl)
}

async function getWeather() {
    let weather = await fetch(`https://goweather.herokuapp.com/weather/${elements.city.value}`)
    let response = await weather.json()

    if(response.temperature.includes('+')) {
        let newStr = response.temperature.replace('+','')
        elements.temp.innerHTML = newStr
    } else {elements.temp.innerHTML = response.temperature}
    elements.cityName.innerHTML = elements.city.value
    let textInfo = `${response.description}, ${response.wind}`
    elements.info.innerHTML = textInfo
    getBgImage(elements.city.value)
    //getIcon(elements.city.value)
    console.log(response)
}

async function render() {
    await getWeather()
    elements.loader.classList.add('inactive')
    elements.weatherDiv.classList.remove('inactive')
}
render()