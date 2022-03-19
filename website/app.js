// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth() + 1 + "." + date.getDate() + "." + date.getFullYear();

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

const apiKey = "&appid=a462a2394c4192ac38d1e5bda213dae0&units=imperial";


document.querySelector('#generate').addEventListener('click', generateWeather);

function generateWeather()
{
  const zip = document.querySelector('#zip').value;
  const feelings = document.querySelector("#feelings").value;

  getWeather(zip)
  .then(function(data){
    postData('/add', {
      date: newDate,
      city: data.name,
      temp: data.main.temp,
      feel: feelings,
    })
  })
  .then(function(){retrieveData()})
}

const getWeather = async (zip)=>{
  const res = await fetch(baseURL + zip + apiKey);

  try{
  const data = await res.json();
  console.log(data);
  return data;
  }catch(error){
    console.log("error", error);
  }
}

const postData = async (url='', data={}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};

const retrieveData = async () =>{
 const request = await fetch('/all');
 try {
 // Transform into JSON
 const allData = await request.json()
 console.log(allData)
 // Write updated data to DOM elements
 document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' deg';
 document.getElementById("content").innerHTML = `" ${allData.feel} "`;
 document.getElementById('date').innerHTML = allData.date;
 document.getElementById("city").innerHTML = allData.city;
 }
 catch(error) {
   console.log("error", error);
   // appropriately handle the error
 }
}
