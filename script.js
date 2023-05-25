const elements = {
    chooseDiv: document.querySelector('div.chooseCity'),
    main: document.querySelector('main'),
    body: document.querySelector('body'),
    icon: document.querySelector('img'),
    temp: document.querySelector('h1'),
    cityInput: document.querySelector('input[type=text].inputCity'),
    cityChangeInput: document.querySelector('input[type=text].inputChangeCity'),
    changeCityDiv: document.querySelector('div.changeCity'),
    cityName: document.querySelector('aside'),
    info: document.querySelector('p'),
    loader: document.querySelector('.loader'),
    weatherDiv: document.querySelector('.weather')
}
let cityInput = 'Tokyo'
//https://serpapi.com/search.json?q=<TO BE SEARCHED>&engine=google_images&ijn=0
//Afim de testes
async function changeCity(id) {
    if(id=='firstCity') {
        cityInput = elements.cityInput.value;
        elements.chooseDiv.classList.add('inactive')
        elements.main.classList.remove('inactive')
        render()
        elements.changeCityDiv.classList.remove('inactive')
    } else {
        cityInput = elements.cityChangeInput.value;
        elements.cityChangeInput.value = '';
        render()
    }
    console.log(cityInput)
}

async function getBgImage(search) {
    let image = await fetch(`https://api.unsplash.com/search/photos?query=${search}%20city&client_id=2VQEqLzwy2ACrrycfiHnOSa0OZtHpKndb8J67o72ggc`)
    let response = await image.json()
    let imageUrl = response.results[0].urls.regular

    elements.body.style.backgroundImage = `url(${imageUrl})`
    console.log(response, imageUrl)
}

async function getWeather() {
    elements.loader.classList.remove('inactive')
    let weather = await fetch(`https://goweather.herokuapp.com/weather/${cityInput}`)
    let response = await weather.json()

    if(response.temperature.includes('+')) {
        let newStr = response.temperature.replace('+','')
        elements.temp.innerHTML = newStr
    } else {elements.temp.innerHTML = response.temperature}
    elements.cityName.innerHTML = cityInput
    let textInfo = `${response.description}, ${response.wind}`
    elements.info.innerHTML = textInfo
    getBgImage(cityInput)
    //getIcon(elements.city.value)
    console.log(response)
    elements.loader.classList.add('inactive')
}

async function render() {
    try {
        await getWeather()  
    } catch (error) {
        window.alert('Choose a available city')
        elements.loader.classList.add('inactive')  
        return false
    }
    elements.weatherDiv.classList.remove('inactive')
}