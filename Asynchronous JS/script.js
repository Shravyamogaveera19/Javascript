// 'use strict';

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// ////////////////////////////////////////////////////////
// //PUBLIC API //REST countries

// const request = new XMLHttpRequest();
// request.open('GET','https://restcountries.com/v3.1/name/india');
// request.send();
// //console.log(request.responseText);

// request.addEventListener('load',function(){
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>`
//         ;
//     countriesContainer.insertAdjacentHTML('beforeend',html);
//     countriesContainer.computedStyleMap.opacity = 1;
// });
'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

////////////////////////////////////////////////////////
// PUBLIC API //REST countries

const getCountrydata = function(country)
{
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Extract language and currency details
    const languages = Object.values(data.languages).join(', ');
    const currency = Object.values(data.currencies)[0].name;

    const html = `
        <article class="country">
        <img class="country__img" src="${data.flags.png}" alt="Country Flag" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${languages}</p>
            <p class="country__row"><span>💰</span>${currency}</p>
        </div>
        </article>`;
        
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
    });
}
getCountrydata('india');
getCountrydata('usa');
getCountrydata('germany');
