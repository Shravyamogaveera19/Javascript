'use strict';

function calcAge(birthYear){
    const age = 2037-birthYear;

    function printAge(){
        const output=`You are ${age},born in ${birthYear}`;
        console.log(output);

        if(birthYear >= 1981  && birthYear <= 1996){
            var millenial = true;
            //const firstName = 'Shravya';
            //Block scope - str
            const str = `Oh, and you're a millenial, ${firstName}`;
            console.log(str);

            //function add(a,b){
                //return a+b;
            //}
            //const output = 'New output';
        }
        //console.log(str);
        console.log(millenial);//function scope
        //console.log(add(2,3));
        //console.log(output);
    }
    printAge();

    return age;
}

const firstName ='Jonas';
calcAge(1991);