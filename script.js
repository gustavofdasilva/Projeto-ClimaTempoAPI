const elements = {
    temp: document.querySelector('h1'),
    city: document.querySelector('input[type=text]'),
    cityName: document.querySelector('aside'),
    info: document.querySelector('p'),
    loader: document.querySelector('.loader'),
    weatherDiv: document.querySelector('.weather')
}

elements.city.value = 'Ohio' //Afim de testes

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
    console.log(response)
}

async function render() {
    await getWeather()
    elements.loader.classList.add('inactive')
    elements.weatherDiv.classList.remove('inactive')
}

render()