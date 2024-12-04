'use strict';
/*console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent ='Correct Number!';

document.querySelector('.number').textContent=13;
document.querySelector('.score').textContent=10;

document.querySelector('.guess').value=23;
console.log(document.querySelector('.guess').value);
*/
let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
let highscore=0;

const displaymessage = function(message){
    document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener
('click',function(){
    const guess=Number(document.querySelector('.guess').value);
    console.log(guess,typeof guess);
    //No input
    if(!guess){
        displaymessage('No number!');
    }
    //When player wins
    else if(guess === secretNumber)
    {   
        document.querySelector('.number').textContent = secretNumber;
        //document.querySelector('.message').textContent ='Correct Number!';
        displaymessage('Correct Number!');
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width ='30rem';

        if(score > highscore)
        {
            highscore = score;
            document.querySelector('.highscore').textContent= highscore;
        }
    }
    else if(guess !== secretNumber)
    {
        if(score > 1)
        {
            //document.querySelector('.message').textContent= guess > secretNumber ?'Too high!':'Too Low!';
            displaymessage(guess > secretNumber ?'Too high!':'Too Low!');
            score=score-1;
            document.querySelector('.score').textContent=score;
        }
        else{
            //document.querySelector('.message').textContent='You lost the game!';
            displaymessage('You lost the game!');
            document.querySelector('.score').textContent='0';
        }
    }
    //Guess too high
    // else if(guess > secretNumber)
    // {
    //     if( score > 1)
    //     {
    //     document.querySelector('.message').textContent='Too high!';
    //     score=score-1;
    //     document.querySelector('.score').textContent=score;
    //     }
    //     else{
    //         document.querySelector('.message').textContent='You lost the game!';
    //         document.querySelector('.score').textContent='0';
    //     }
    // }
    //Guess too low
    // else if(guess < secretNumber)
    // {
    //     if(score > 1)
    //     {
    //     document.querySelector('.message').textContent='Too low!';
    //     score=score-1;
    //     document.querySelector('.score').textContent=score;
    //     }
    //     else{
    //         document.querySelector('.message').textContent='You lost the game!';
    //         document.querySelector('.score').textContent='0';
    //     }
    // }
});
document.querySelector('.again').addEventListener
('click',function(){
    score=20;
    secretNumber = Math.trunc(Math.random()*20)+1;
    document.querySelector('.score').textContent=score;
    document.querySelector('body').style.backgroundColor = '#222';
    //document.querySelector('.message').textContent ='Start Guessing!';
    displaymessage('Start Guessing!');
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value='';
    document.querySelector('.number').style.width='15rem';
});
