'use strict';

// const bookings = [];
// const createBooking = function(flightNum,
//     numPassengers = 1,price = 199){
        //ES5
        // numPassengers = numPassengers || 1;
        // price = price || 199;

    //     const booking = {
    //         flightNum,
    //         numPassengers,
    //         price
    //     }
    //     console.log(booking);
    //     bookings.push(booking);
    // }
    // createBooking('LH123');
    // createBooking('LH123',2,800);
    // createBooking('LH123',2);
    // createBooking('LH123',5);

    // createBooking('LH123',undefined,1000);

    // const flight = 'LH234';
    // const shravya = {
    //     name : 'Shravya S Mogaveera',
    //     passport : 12345678
    // }
    // const checkIn = function(flightNum , passenger){
    //     flightNum = 'LH999';
    //     passenger.name = 'Ms.' + passenger.name;
    //     //console.log(flightNum); //LH999
    //     if(passenger.passport == 12345678){
    //         alert('Checked in');
    //     }
    //     else  {
    //         alert('Wrong passport');
    //     }
    // }
    // checkIn(flight , shravya);
    // console.log(flight);//LH234
    // console.log(shravya);

    //Is the same as doing
    // const flightNum = flight;
    // const passenger = shravya;

    // const newPassport = function(person){
    //     person.passport = Math.trunc(Math.random()*100000000);
    // }
    
    // newPassport(shravya);
    // checkIn(flight,shravya);

    /* const oneWord = function(str){
        return str.replace(/ /g,'').toLowerCase();
    };
    
    const upperFirstWord = function(str){
        const [first, ...others] = str.split(' ');
        return [first.toUpperCase(), ...others].join(' ');
    };

    const transformer = function(str , fn){
        console.log(`Original String:${str}`);
        console.log(`Transformed string : ${fn(str)}`);

        console.log(`Transformed by: ${fn.name}`);
    }
    
    transformer('Javascript is the best!',upperFirstWord);
    transformer('JavaScript is the best!',oneWord);

    // JS uses callbacks all the time
    const high5 = function(){
        console.log('🖐️');
    }
    document.body.addEventListener('click',high5);
    ['Shravya', 'Chai', 'Suji'].forEach(high5);
    */

    /* const greet = function(greeting) {
        return function(name){
            console.log(`${greeting} ${name}`);
        };
    };
    */
    /*const greetArr = greeting =>name=>
    {
        console.log(`${greeting} ${name}`);
    };*/

    // const greeterHey = greet('Hey');
    // greeterHey('Shravya');
    // greeterHey('Chai');

    // greet('Hello')('Shravya');
    //greetArr('Hello')('Shravya');

    /*
    const AirIndia ={
        airline: 'AirIndia',
        iataCode : 'AI',
        bookings: [],
        //book: function(){}
        book(flightNum , name){
            console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
            );
        this.bookings.push({ flight: `${this.iataCode} ${flightNum}` , name});
        },
    };
    AirIndia.book(123,'Shravya');
    AirIndia.book(113,'Sujith');
    console.log(AirIndia);

    const Vistara = {
        airline :'Vistara',
        iataCode:'VS',
        bookings: [],
    };
    const book = AirIndia.book;

    //Doesn't work
    //book(23, 'Shravya S Mogaveer');

    //Call method
    book.call(Vistara,23,"Shravya S Mogaveera");
    console.log(Vistara);

    book.call(AirIndia,234,"Sujith Chandan");
    console.log(AirIndia);

    const swiss = {
        airline :'Swiss Air lines',
        iataCode:'LX',
        bookings: []
    };

    book.call(swiss, 122,'Chai D');
    console.log(swiss);

    //Apply method
    const flightData = [345, 'Aradhya'];
    book.apply(swiss, flightData);
    console.log(swiss);

    book.call(swiss, ...flightData);

    //Bind method
    const bookV = book.bind(Vistara);
    const bookAI = book.bind(AirIndia);
    const bookLX = book.bind(swiss);
    bookV(23, 'Sujith N');
    
    const bookEW23 = book.bind(Vistara,23);
    bookEW23('Shravya');
    bookEW23('Shraddha');

    //With Event Listeners
    AirIndia.planes = 300;
    AirIndia.buyPlane = function(){
        console.log(this);

        this.planes++;
        console.log(this.planes);
    };
    document.querySelector('.buy').addEventListener(
        'click',AirIndia.buyPlane.bind(AirIndia)
    );

    //Partial Application
    const addTax = (rate, value) => value + value*rate;
    console.log(addTax(0.1,200));
     
    const addVAT = addTax.bind(null, 0.23);
    //addVAT = value =>value + value * 0.23;
    
    console.log(addVAT(100));
    console.log(addVAT(23));
    
    const addTaxRate = function(rate){
        return function(value){
            return value + value * rate;
        };
    };
    const addVAT2 = addTaxRate(0.23);
    console.log(addVAT2(100));
    console.log(addVAT2(23));*/
    

    /*
    const runOnce = function(){
        console.log('This will not run again');
    };
    runOnce();
    (function(){
        console.log('This will not run again');
        const isPrivate = 23;
    })();

    //console.log(isPrivate); //Error

    (() => console.log('This will also not run again'))
    ();

    {
        const isPrivate = 23;
        var notPrivate = 46;
    }
    //console.log(isPrivate); //Error
    console.log(notPrivate);  // accessible
    */
   
//Closures
    /*
    const secureBooking = function(){
        let passengerCount =0;
        return function(){
            passengerCount++;
            console.log(`${passengerCount} passengers`);
        };
    };
    const booker = secureBooking();
   booker();
   booker();
   booker();
   
   console.dir(booker);
   */
   /*
   //Example 1
   let f;

   const g= function(){
        const a = 23;
        f = function(){
            console.log(a*2);
        };
   };
    
   const h = function(){
    const b= 777;
    f=function(){
        console.log(b*2);
    };
   };

   g();
   f();

   //Reassigning f function
   h();
   f();

   console.dir(f);

   //Example 2
   const boardPassengers = function(n, wait){
       //const perGroup = n/3;

       setTimeout(function() {
            console.log(`We are boarding all ${n} passengers`);
            console.log(`There are three groups ,each with ${perGroup} passengers`)
       },wait * 1000);

       console.log(`Will start boarding in ${wait} seconds`);
   };

   const perGroup = 1000;
   boardPassengers(180,3);
 */

   (function(){
       const header = document.querySelector('h1');
       header.style.color = 'red';

       document.querySelector('body').addEventListener
       ('click',function() {
            header.style.color ='blue';
       });
   })();
