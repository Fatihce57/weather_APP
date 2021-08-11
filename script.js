const url = "https://api.openweathermap.org/data/2.5/weather?"           // 1) https://openweathermap.org/current
const key = "83ca624c0e1dd6a16e948384b65009bb"                          // 2) yukaridaki sayfadan my app key den kendimizde key no olusrabiliriz

const setQuery = (e) => {                                               // 5) e(event) üzerinden keyCode u arastiragiz, eger keyCode 13 e esit ise entera basma islemi gerceklesmis demektir.
    if (e.keyCode == "13")
        getResult(searchBar.value)                                      // 6) getResult fonksiyonunu sehir ismi ile cagirmak icin searchBar.value ile degeri gönderiyoruz
}

const getResult = (cityName) => {                                            // 7) getResult fonksiyonunda cityName parametresi ile yazilan sehir ismine ulasiyoruz  
    let query = `${url}q=${cityName}&appid=${key}&units=metric&lang=de`     // 8) url üzerinden API ye ulasiyoruz. q ve appid zorunlu digerleri opsiyonel. kullanilacak datalari gönderiyoruz.(bilgiler https://openweathermap.org/current e mevcut) (units=metric dereceyi °C olarak veriyor)
    fetch(query)                                                             // 9) istegimizi olusturmak icin fetch ten yararlaniyoruz
        .then(weather => {                                                   // 10) zincir yapisiyla istege cevap alacagiz. dönen degeri yakalamak icin "weather" isimli degisken tanimliyoruz.
            return weather.json()                                            // 11) promis yapisiyla calistigi icin direk calistiramiyoruz. return ile json formatina döndürüyoruz.
        })
        .then(displayResult)                                                // 12) Döndürdügümüz yapiyi zincir yapisiyla (.then) kullaniyoruz. Yeni bir fonsiyon (displayResult) olusturarak bunun icinde görüntüleyebiliriz
}

const displayResult = (result) => {                                         // 13) json icerisindeki degerleri bu fonsiyonda gösteriyoruz
    let city = document.querySelector(".city")                              // 14) HTML deki .city i "document.querySelector" ile yakalayip edit leyecegiz.
    city.innerText = `${result.name}, ${result.sys.country}`                // 15) "city.innerText" ile icerisine yazmak istedigimiz degeri yaziyoruz.

    let temp = document.querySelector(".temp")
    temp.innerText = `${Math.round(result.main.temp)} °C`                   // 16) "Math.round" metodu ile rakami yuvarliyoruz

    let desc = document.querySelector(".desc")
    desc.innerText = result.weather[0].description                          // 17) icerisinde bir array var ondan dolayo 0 inci arraya ulasmak istiyoruz

    let minmax = document.querySelector(".minmax")
    minmax.innerText = `Min: ${Math.round(result.main.temp_min)} °C | Max: ${Math.round(result.main.temp_max)} °C`
}

const searchBar = document.getElementById("searchBar")                   // 3) istek input degerinden gelen sehir ismi ile olusturuluyor. Ondan dolayi ilk olarak sehiri yakaliyoruz. getElementById ile searchBari yakaliyoruz.
searchBar.addEventListener("keypress", setQuery)                        // 4) searchBar etiketinden gelen islemleri yapabilmek icin addEventListener ile dinleme islemi yapiyoruz. enter tusuna basilinca sehiri yakalamak istiyoruz. setQuery isimli fonksiyon tanimliyoruz.