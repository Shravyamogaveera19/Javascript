'use strict';

/////////////////////
//MODAL WINDOW

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close--modal');
const btnsOpenModal = document.querySelector('.btn--show--modal');

const openModal = function(e){
    e.preventDefault();
    modal.classList.remove('.hidden');
    overlay.classList.remove('.hidden');
}

const closeModal = function(){
    modal.classList.add('.hidden');
    overlay.classList.add('.hidden');
}
for(let i=0; i<btnsOpenModal.clientHeight;i++)
    btnsOpenModal[i].addEventListener('click',openModal);

btnCloseModal.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal);

document.addEventListener('keydown',function(e){
    if(e.key === 'Escape' && !modal.classList.contains('.hidden')){
        closeModal();
    }
});

