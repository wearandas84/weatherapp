'use strict'
getData();

async function getData(){
    var ciudad = "Mérida";
    var estado = "Yucatán";
    var pais = "MX";
    const apikey = "6f1c1ac1863908f7bd57c53184083962";
    const geo = "http://api.openweathermap.org/geo/1.0/direct?q="+ciudad+","+estado+","+pais+"&limit=1&appid="+apikey;
    var url="";

    fetch(geo)
        .then((response) =>{
            if(!response.ok) {
                document.querySelector(".error").append("No se pudo obtener informacion " + error);
            }
            else{
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);
            var lat = data[0]["lat"];
            var lon = data[0]["lon"];
            url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apikey+"&lang=es&units=metric";
            fetch(url) 
                .then((response) => {
                    if(!response.ok) {
                        document.querySelector(".error").append("No se pudo obtener informacion " + error);
                    }
                    else{
                        return response.json();
                    }
            
                })
                .then ((data) => {
                    var city = data["name"];
                    var temp = data["main"]["temp"];
                    var tmax = data["main"]["temp_max"];
                    var tmin = data["main"]["temp_min"];
                    var conds = data["weather"][0]["description"];
                    document.querySelector("#city").append(city);
                    document.querySelector("#conds").append(conds);
                    document.querySelector("#temp").append(temp);
                    document.querySelector("#tmax").append(tmax);
                    document.querySelector("#tmin").append(tmin);
                })
                .catch(function(error){
                    document.querySelector(".error").append("No se pudo obtener informacion " + error);
                })


        })
        .catch(function(error){
            document.querySelector(".error").append("No se pudo obtener informacion " + error);
        })
    
    
}
