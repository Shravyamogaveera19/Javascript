"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderCountry = function (data, className = "") {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const renderError  = function(msg){
  countriesContainer.insertAdjacentText('beforeend',msg);
  countriesContainer.style.opacity = 1;
 }

////////////////////////////////////////////////////////
// PUBLIC API //REST countries

//AJAX CALL 
/*
  const getCountryandNeighbour = function(country)
  {
      //Ajax call country 2
      const request = new XMLHttpRequest();
      request.open('GET', `https://restcountries.com/v2/name/${country}`);
      request.send();

      request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);

      //Render Country 1
      renderCountry(data);

      //get neightbour country(2)

      const[neighbour] = data.borders;

      if(!neighbour) return;

      //AJAX Call country 2
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
      request2.send();

      request2.addEventListener('load',function(){
          const data2 = JSON.parse(this.responseText);
          console.log(data2);

          renderCountry(data2,'neighbour');
      });
      });
  }
*/
  /*
  getCountryandNeighbour('usa');

  setTimeout(() =>{
      console.log('1 second passsed');
      setTimeout(() =>{
          console.log('2 second passsed');   
          setTimeout(() =>{
              console.log('3 second passsed');
              setTimeout(() =>{
                  console.log('4 second passsed');
            },1000);
        },1000);
    },1000);
  },1000);
  */

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// const request = fetch(`https://restcountries.com/v2/name/${"portugal"}`);
// console.log(request);

/*const getCountryData = function(country){
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function(response){
      console.log(response);
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      renderCountry(data[0]);
    });
  };
  */

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Using promises
/*
const getJSON = function(url, errorMsg = 'Something went Wrong'){
  return fetch(url)
  .then((response) => {
    //console.log(response);

    if(!response.ok)
      throw new Error(`${errorMsg} (${response.status})`);
    return response.json(); 
})
};


const getCountryData = function (country) {
   //Country1
    getJSON(`https://restcountries.com/v2/name/${country}`,`Country not found`)
    .then((data) => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];
  
      if (!neighbour) throw new Error('No neighbour found!');

      //Country 2
      return getJSON(`https://restcountries.com/v2/name/${neighbour}`,`Country not found`);
      //.then((data) => {
      //return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then((data) => renderCountry(data, "neighbour")) 
    .catch((err) => {
      console.error(`${err} ERROR`);
      renderError(`Something went wrong ${err
        .message}. Try again!`);
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  getCountryData('australia');
});

*/

//Creating Promises
/*
const wait = function(seconds){
    return new Promise(function(resolve){
        setTimeout(resolve, seconds*1000);
    });
};

const getPosition = function(){
  return new Promise(function(resolve ,reject){
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve,reject);
  });
}

const whereAmI = function(){

  getPosition()
  .then(pos => {
     const {latitude: lat, longitude: lng} = pos.coords;
  return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  })
  
  .then(res => {
   if(!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
   return res.json();
   })
  .then(data => {
     console.log(data);
     console.log(`You are in ${data.city} ,${data.country}`);

     return fetch(`https://restcountries.com/v2/name/${data.country}`);
   })
   .then(res =>{
     if(!res.ok)
       throw new Error(`Country not Found (${res.status})`);

     return res.json();
   })
   .then(data => renderCountry(data[0]))
   .catch(err => console.error(`${err.message} ERROR`));
};
//getPosition().then(pos => console.log(pos));

btn.addEventListener('click',whereAmI);

*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Using async and Await functions

const getPosition = function(){
  return new Promise(function(resolve ,reject){
    navigator.geolocation.getCurrentPosition(resolve,reject);
  });
}

const whereAmI = async function(){
  try{
  //GeoLocation
  const pos = await getPosition();
  const {latitude:lat ,longitude:lng} = pos.coords;
  
  //Reverse Geocoding
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  if(!resGeo.ok) throw new Error('Problem getting location')

  const dataGeo = await resGeo.json();

  //Country Data
  const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
  if(!res.ok) throw new Error('Problem getting location')
  const data = await res.json();
  
  renderCountry(data[0]);

  return `You are in ${dataGeo.city},${dataGeo.country}`;
  }
  catch(err){
    console.error(`${err} ERROR`);
    renderError(`Something went wrong ${err.message}`);

    //Reject async Promises
    throw err;
  }
}

// console.log("1:Will get Location");
// const city = whereAmI();
// console.log(city);
// whereAmI()
// .then(city => console.log(`2:${city}`))
// .catch(err => console.error(`2:${err.message} ERROR`))
// .finally(()=>console.log("3:Finished Getting Location"));

(async function(){
  try{
    const city = await whereAmI();
    console.log(`2:${city}`);
  }
  catch(err){
    console.error(`2:${err.message} ERROR`)
  }
  console.log("3:Finished Getting Location")
})();


//Parallel Promises
/*
const get3Countries = async function(c1,c2,c3){
  try{
    // const [data1] = await getJSON(
    //   `https://restcountries.com/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.com/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.com/v2/name/${c3}`
    // );
    // console.log([data1.capital,data2.capital,data3.capital]);
    
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
    
  }catch(err){
    console.error(err);
  }
}
get3Countries('portugal','canada','tanzania');
*/


//Other Promise Combinators 

//Promise.race
/*
(async function(){
const res = await Promise.race([
  getJSON(`https://restcountries.com/v2/name/italy`),
  getJSON(`https://restcountries.com/v2/name/egypt`),
  getJSON(`https://restcountries.com/v2/name/mexico`),
]);
console.log(res[0]);
})();

const timeout = function(sec){
  return new Promise(function(_,reject){
      setTimeout(function(){
        reject (new Error('Request took too long!'));
      },sec * 1000)
  });
};
Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(1)
])
.then(res => console.log(res[0]))
.catch(err => console.error(err));

//Promise.allsettled

Promise.allSettled([
  Promise.resolve('SUCCESS'),
  Promise.reject('ERROR'),
  Promise.resolve('ANOTHER SUCCESS'),
]).then(res => console.log(res));

//Promise.all

Promise.all([
  Promise.resolve('SUCCESS'),
  Promise.reject('ERROR'),
  Promise.resolve('ANOTHER SUCCESS'),
]).then(res => console.log(res))
.catch(err => console.error(err));

//Promise.any

Promise.any([
  Promise.resolve('SUCCESS'),
  Promise.reject('ERROR'),
  Promise.resolve('ANOTHER SUCCESS'),
]).then(res => console.log(res))
.catch(err => console.error(err));
*/

