'use strict';
/////////////////////
//MODAL WINDOW
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function(e){
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
// for(let i=0; i<btnsOpenModal.length;i++)
//     btnsOpenModal[i].addEventListener('click',openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal));

btnCloseModal.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal);

document.addEventListener('keydown',function(e){
    if(e.key === 'Escape' && !modal.classList.contains('hidden')){
        closeModal();
    }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click',function(e){
    /*
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);

    console.log(e.target.getBoundingClientRect());

    console.log('CurrentScroll (X/Y)',window.pageXOffset,pageYOffset);

    console.log(
        'height/width viewport',
        document.documentElement.clientHeight,
        document.documentElement.clientWidth
    );
    */
    //Scrolling
    /*
    window.scrollTo(
        s1coords.left + window.pageXOffset,
        s1coords.top + window.pageYOffset
    );
    */
   /*
    window.scrollTo({
        left: s1coords.left + window.pageXOffset,
        top : s1coords.top + window.pageYOffset,
        behavior :'smooth',
    });
    */
    section1.scrollIntoView({behavior : 'smooth'});
});

////////////////////////////////////////////////
////////////////////////////////////////////////

//Adding cookies
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName
('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

const header = document.querySelector('.header');
//Creating and Inserting Elements
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML ='We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';

//header.prepend(message);
header.append(message);
//header.append(message.cloneNode(true));

//header.before(message);
//header.after(message);

//Delete elements
document.querySelector('.btn--close-cookie')
.addEventListener('click',function(){
    message.remove();
});

//Styles
message.style.backgroundColor ='#37383d';
message.style.width ='120%';

console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = 
Number.parseFloat(getComputedStyle(message).height,
10)+30+'px';

document.documentElement.style.setProperty
('--color-primary','orangered');
*/
/*
//Attributes
const logo=document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt ='Beautiful minimalist logo';

console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company','Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

//Data Attributes
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c','j');
logo.classList.remove('c','j');
logo.classList.toggle('c');
logo.classList.contains('c'); //not includes 

//Dont use
logo.className = 'jonas';
*/

