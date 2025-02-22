/////////////////////////////////////////////////////////////////////////////////////////////////

//Coding Challenge 1

const whereAmI = function(lat,lng){
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
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
 
 whereAmI(52.508,13.381);  
 whereAmI(19.037,72.873);  
 whereAmI(-33.933,18.474); 
 
 
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

//Coding Challenge 2

const imgContainer = document.querySelector('.images');
const createImage = function (imgPath){
  return new Promise(function(resolve,reject){
      const img = document.createElement('img');
      img.src = imgPath;

      img.addEventListener('load' , function() {
        imgContainer.append(img);
        resolve(img);
      });

      img.addEventListener('error',function(){
        reject(new Error('Image not found'));
      });
  });
};

const wait = function(seconds){
  return new Promise(function(resolve){
      setTimeout(resolve, seconds*1000);
  });
};

let currentImg;
createImage('img-1.jpg')
.then(img => {
  currentImg = img;
  console.log('Image 1 loaded');
  return wait(2);
})
.then(() => {
  currentImg.style.display = 'none';
  return createImage('img-2.jpg');
})
.then(()=>{
  currentImg = img;
  console.log('Image 2 loaded');
  return wait(2);
})
.then(()=>{
  currentImg.style.display = 'none';
})
.catch(err => console.error(err));

////////////////////////////////////////////////////////////////////////////////////////////////////

//Coding Challenge 3
//PART 1
const LoadNPause = async function(){
  try{
    //Load image 1
    let img = await createImage('img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    //Load image 2
    img = await createImage('img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  }
  catch(err){
    console.error(err);
  }
};
//LoadNPause();

//PART @

const loadALL = async function(imgArr){
  try{
      const imgs = imgArr.map(async img => await
        createImage(img));
      console.log(imgs);

      const imgsEl = await Promise.all(imgs);
      console.log(imgsEl);

      imgsEl.forEach(img => img.classList.add('parallel')); 
  }
  catch(err){
      console.error(err);
  }
}; 
loadALL(['img-1.jpg','img-2.jpg','img-3.jpg']);



