//Importing module
// import {addToCart, totalPrice as Price,qt} from './shoppingCart.js';
// addToCart('bread',5);
// console.log(Price , qt);

console.log("Importing module");

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread',5);
// console.log(ShoppingCart.totalPrice);

// import add,{addToCart, totalPrice as Price,qt} from './shoppingCart.js';
// console.log(Price);

import add,{cart} from './shoppingCart.js';
add('Pizza',2);
add('Bread',5);
add('Apples',4);
console.log(cart);

// console.log("Start Fetching");
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

const getLastPost = async function(){
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();

    return {title: data.at(-1).title ,text: data.at(-1).body};
};

const LastPost = getLastPost();
console.log(LastPost);

//Not very Clean
//LastPost.then(last => console.log(last));

const LastPost2 = await getLastPost();
console.log(LastPost2);
