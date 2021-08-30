const url = "https://api.openweathermap.org/data/2.5/weather?"           
var key = config.SECRET_API_KEY;                                         

const setQuery = (e) => {                                               
    if (e.keyCode == "13")                                              
        getResult(searchBar.value)                                      
}

const getResult = (cityName) => {                                            
    let query = `${url}q=${cityName}&appid=${key}&units=metric&lang=de`     
    fetch(query)                                                             
        .then(weather => {                                                   
            return weather.json()                                            
        })
        .then(displayResult)                                                
}

const displayResult = (result) => {                                         
    let city = document.querySelector(".city")                              
    city.innerText = `${result.name}, ${result.sys.country}`                

    let temp = document.querySelector(".temp")
    temp.innerText = `${Math.round(result.main.temp)} °C`                   

    let desc = document.querySelector(".desc")
    desc.innerText = result.weather[0].description                          

    let minmax = document.querySelector(".minmax")
    minmax.innerText = `Min: ${Math.round(result.main.temp_min)} °C | Max: ${Math.round(result.main.temp_max)} °C`
}


// const bgImg = () => {
//     if (result.weather == "Klarer Himmel") {

//         return document.body.style.backgroundImage = "url('./picture/foggy.jpg')";
//     }
// }

const searchBar = document.getElementById("searchBar")                   // 3) istek input degerinden gelen sehir ismi ile olusturuluyor. Ondan dolayi ilk olarak sehiri yakaliyoruz. getElementById ile searchBari yakaliyoruz.
searchBar.addEventListener("keypress", setQuery)                        // 4) searchBar etiketinden gelen islemleri yapabilmek icin addEventListener ile dinleme islemi yapiyoruz. enter tusuna basilinca sehiri yakalamak istiyoruz. setQuery isimli fonksiyon tanimliyoruz.