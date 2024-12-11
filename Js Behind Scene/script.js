'use strict';
// function calcAge(birthYear){
//     const age = 2037-birthYear;

//     function printAge(){
//         const output=`You are ${age},born in ${birthYear}`;
//         console.log(output);

//         if(birthYear >= 1981  && birthYear <= 1996){
//             var millenial = true;
//             //const firstName = 'Shravya';
//             //Block scope - str
//             const str = `Oh, and you're a millenial, ${firstName}`;
//             console.log(str);

//             //function add(a,b){
//                 //return a+b;
//             //}
//             //const output = 'New output';
//         }
//         //console.log(str);
//         console.log(millenial);//function scope
//         //console.log(add(2,3));
//         //console.log(output);
//     }
//     printAge();

//     return age;
// }

// const firstName ='Jonas';
// calcAge(1991);

//Hoisting
//Variables
// console.log(me);
//console.log(job);
//console.log(year);

// var me = 'Shravya';
// let job='teacher';
// const year = 1991;

//Functions
//console.log(addDecl(2,3));
//console.log(addExpr(2,4));
//console.log(addArrow(2,5));

// function addDecl(a,b)
// {
//     return a+b;
// }
// const addExpr = function(a,b){
//     return a+b;
// };
// const addArrow=(a,b) => a + b;

// if(!numProducts) deleteShoppingCart();
// //Example
// var numProducts = 10;
// function deleteShoppingCart(){
//      console.log("All products deleted!");
// }

// var x=1;
// let y=2;
// const z=3;

// console.log( x=== window.x );
// console.log( y=== window.x );
// console.log( z=== window.x );

// console.log(this);

// const calcAge = function(birthYear){
//     console.log(2037 - birthYear);
//     console.log(this);
// };
// calcAge(1991);

// const calcAgeArrow =birthYear => {
//     console.log(2037 - birthYear);
//     console.log(this);
// };
// calcAgeArrow(1991);

// const shravya ={
//     year : 1991,
//     calcAge: function(){
//         console.log(this);
//         console.log(2037 - this.year);
//     },
// };
// shravya.calcAge();

// const matilda = {
//     year:2017,
// };
// matilda.calcAge = shravya.calcAge;
// matilda.calcAge();

// const f=shravya.calcAge;
// f();

//var firstName= 'Matilda';
// const shravya = {
//     firstName:'Shravya',
//     year:1991,
//     calcAge: function() {
//         console.log(this);
//         console.log(2037 - this.year);
        
        //Solution 1
        // const self =this;
        // const isMillenial = function(){
        //     console.log(self);
        //     console.log(self.year >= 1981 && self.year <=1996);
        //     //console.log(this.year >= 1981 && this.year <=1996);
        // };

        //Solution 2
        // const isMillenial = () =>{
        //     console.log(this);
        //     console.log(this.year >= 1981 && this.year <=1996);
            //console.log(this.year >= 1981 && this.year <=1996);
        //};
        //isMillenial();
   // },
//     greet: () => {
//         console.log(this);
//         console.log(`Hey ${this.firstName}`);
//     },

// };
// shravya.greet();
// shravya.calcAge();

// Arguments Keyword
// const addExpr = function(a,b){
//     console.log(arguments);
//         return a+b;
//     };
//     addExpr(2,5);
//     addExpr(2,5,8,9);
//     const addArrow=(a,b) =>{
//         console.log(arguments);
//         return a + b;
//     };
//     addArrow(2,5,8);

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const me = {
//     name :'Shravya',
//     age:20,
// };
// const friend= me;
// friend.age = 27;
// console.log('Friend:',friend);
// console.log('Me:',me);

//Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName,oldLastName);

//Reference types
const jessica = {
    firstName : 'Jessica',
    lastName : 'Williams',
    age:27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log("Before marriage:",jessica);
console.log("After marriage:",marriedJessica);

//copying objects
const jessica2 = {
    firstName : 'Jessica',
    lastName : 'Williams',
    age:27,
    family:['Alice','Bob'],
};
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log("Before marriage:",jessica2);
console.log("After marriage:",jessicaCopy);

