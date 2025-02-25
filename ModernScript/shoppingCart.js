//Exporting module
console.log("Exporting module");

// console.log('Start Fetching Users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finished Fetching Users');


const shippingCost = 10;
export const cart = [];

export const addToCart = function(product, quantity){
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export {totalPrice,totalQuantity as qt};

export default function(product, quantity){
    cart.push({product,quantity});
    console.log(`${quantity} ${product} added to cart`);
};
