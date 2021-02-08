document.querySelector('.btn').addEventListener('click',(e) => {
    e.preventDefault();
    var searchText = document.querySelector('.searchText').value;
    main(searchText)
})

function main(searchText){
    var latlong = [];
    var latlon = getLatLon(searchText);
    latlon.then((data) => {
        console.log(data[0])
        for(let i=0;i<data.length;i++)
        {
            if(searchText == data[i].name)
            {
                latlong.push(data[i].latlng[0],data[i].latlng[1]);
                let country = document.querySelector('.card-title');
                country.innerHTML = data[i].name;
            }
        }
        lat = latlong[0];
        lon = latlong[1];
        data = getWeatherData(lat,lon)
        data.then((datas) => {
            console.log(datas);
            var weatherData = document.querySelector('.datas')
            weatherData.innerHTML = "Temperature: "+datas.main.temp+"<br/>";
            weatherData.innerHTML += "Humidity: "+datas.main.humidity;
        })
    });
}

async function getLatLon(searchText){
    try{
        let resp = await fetch('https://restcountries.eu/rest/v2/all')
        let data = await resp.json();
        return data;
    }
    catch(error){
        console.log("RestCountries Error:",error);
    }
}

async function getWeatherData(lat,lon){
    try{   
        APIKEY = '87f0eb0ffc1b04c2bae619fba3e7e555';
        var URL = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lon +'&appid='+APIKEY;
        let resp = await fetch(URL)
        let data = await resp.json();
        return data;
    }
    catch(error){
        console.log("RestCountries Error:",error);
    }
}