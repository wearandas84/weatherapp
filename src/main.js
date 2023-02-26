'use strict'

const btn = document.querySelector("#envia");

btn.addEventListener("click",getData,false);

function clearInp(){
    document.querySelector("#ciudad").value="";
    document.querySelector("#estado").value="";
    document.querySelector("#pais").value="";
}

function clearWeather(){
    document.querySelector("#city").textContent="Ciudad: ";
    document.querySelector("#conds").textContent="Condiciones: ";
    document.querySelector("#temp").textContent="Temperatura: ";
    document.querySelector("#tmax").textContent="Maxima: ";
    document.querySelector("#tmin").textContent="Minima: ";
}

async function getData(){
    document.querySelector(".info").style.visibility = "visible";
    clearWeather();
    var ciudad = document.querySelector("#ciudad").value;
    var estado = document.querySelector("#estado").value;
    var pais = document.querySelector("#pais").value;

    const apikey = "6f1c1ac1863908f7bd57c53184083962";
    var geo = "http://api.openweathermap.org/geo/1.0/direct?q="+ciudad+","+estado+","+pais+"&limit=1&appid="+apikey;
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
                    clearInp();
                })
                .catch(function(error){
                    document.querySelector(".error").append("No se pudo obtener informacion " + error);
                })


        })
        .catch(function(error){
            document.querySelector(".error").append("No se pudo obtener informacion " + error);
        })
    
    
}
