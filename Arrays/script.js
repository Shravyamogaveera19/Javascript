'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements, sort = false){
    containerMovements.innerHTML = '';
    const movs = sort 
    ? movements.slice()
    .sort((a, b) => a - b) : movements;
    movs.forEach(function(mov,i){
    const type = mov > 0?'deposit' :'withdrawal';
    const html =`
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov}$</div>
        </div>
      `;

    containerMovements.insertAdjacentHTML('afterbegin',html);
    });
};
//displayMovements(account1.movements);


const createUsernames = function(accs){
accs.forEach(function(acc){
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
});
};
//console.log(createUsernames('Steven Thomas Williams'));
createUsernames(accounts);

const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc,mov) => acc +mov ,0);
  labelBalance.textContent = `${acc.balance} $`;
};
//calcDisplayBalance(account1.movements);

const calcDisplaySummary = function(acc){
    const incomes = acc.movements
    .filter(mov => mov > 0 )
    .reduce((acc,mov) => acc+mov,0);
    labelSumIn.textContent =`${incomes}$`;
    
    const out = acc.movements
    .filter(mov => mov < 0 )
    .reduce((acc,mov) => acc+mov,0);
    labelSumOut.textContent =`${Math.abs(out)}$`;

    const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int,i,arr) =>{
       //console.log(arr);
       return int >=1;
    })
    .reduce((acc,int) => acc+int,0);
    labelSumInterest.textContent = `${interest}$`

}
//calcDisplaySummary(account1.movements);

//Update UI
const updateUI = function(acc){
      //DISPLAY MOVEMENTS
        displayMovements(acc.movements);

      //DISPLAY BALANCE
        calcDisplayBalance(acc);
    
      //DISPLAY SUMMARY
        calcDisplaySummary(acc);
}
//Event Handler
let currentAccount;
btnLogin.addEventListener('click',function(e){

  e.preventDefault();
  //console.log('LOGIN');
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  //console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    //console.log('LOGIN');
    //DISPLAY UI AND MESSAGE
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
      containerApp.style.opacity = 100;

    //CLEAR INPUT FIELDS
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
     acc=> acc.username === inputTransferTo.value
  );
  //console.log(amount,receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 &&
     receiverAcc &&
     currentAccount.balance >= amount && 
     receiverAcc.username !== currentAccount.username){
    //console.log('Transfer Valid');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //UPDATE UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click',function(e){
    e.preventDefault();
    //console.log('Delete');
    if(inputCloseUsername.value === currentAccount.username &&
      Number(inputClosePin.value) === currentAccount.pin){
        const index = accounts.findIndex
        (acc => acc.username ===currentAccount.username
        );
        console.log(index);

        //Delete account
        accounts.splice(index,1);

        //Hide UI
        containerApp.style.opacity = 0;
      }
      inputCloseUsername.value = inputClosePin.value ='';
});

btnLoan.addEventListener('click',function(e){
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    
    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
      //Add Movement
      currentAccount.movements.push(amount);

      //Update UI
      updateUI(currentAccount);
    }
});

let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements,!sorted);
  sorted = !sorted;
});
//console.log(accounts);
//console.log(username)';

/*
const eurToUsd = 1.1;

const movementsUSD = movements.map(function(mov){
  return mov*eurToUsd;
});

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for(const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescription = movements.map((mov,i) =>
   `movement ${i+1} : You ${mov>0} ? 'depoisited' : 'withdrew'} ${Math.abs(mov)}`
);
console.log(movementsDescription);
*/

/*
const deposits = movements.filter(function(mov){
    return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor =[];
for(const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawls = movements.filter(function(mov){
  return mov < 0;
});
console.log(withdrawls);
*/
//console.log(movements);

//accumulator -> Snowball

/*const balance = movements.reduce(function(acc,cur,i,arr){
  console.log(`Iteration ${i}: ${acc}`)
  return acc+cur;
},0);


console.log(balance);

let balance2 = 0;
for(const mov of movements) balance2+=mov;
console.log(balance2);

//Maximum value
const max = movements.reduce((acc,mov) =>{
  if(acc > mov)
    return acc;
  else
    return mov;
},movements[0]);
console.log(max);
*/

/*
const eurToUSD = 1.1;
console.log(movements);

//PIPELINE
const totalDepositsUSD = movements
.filter(mov => mov > 0)
.map((mov ,i ,arr) => {
   console.log(arr);
   return mov * eurToUSD;
})
.reduce((acc,mov) => acc+mov,0);
console.log(totalDepositsUSD);
*/

//Find Method
/*
const firstWithdrawl = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawl);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/
/*
console.log(movements);
//INCLUDES : EQUALITY
console.log(movements.includes(-130));
//SOME : CONDITION
console.log(movements.some(mov =>mov === -130));
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

//EVERY METHOD
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//Separate callabck
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

/*
//FLAT METHOD
const arr = [[1,2,3],[4,5,6],7,8];
console.log(arr.flat());

const arrDeep =  [[[1,2],3],[4,[5,6]],7,8];
console.log(arrDeep.flat(2));

const overalBalance = accounts
.map(acc => acc.movements)
.flat()
.reduce((acc, mov)=>acc + mov,0);
console.log(overalBalance);

//FLATMAP METHOD
const overalBalance2 = accounts
.flatMap(acc => acc.movements)
.reduce((acc, mov)=>acc + mov,0);
console.log(overalBalance2);
*/

/*
//SORTING ARRAYS
//Strings
const owners = ['Jonas','Zach','Adam','Martha'];
console.log(owners.sort());
console.log(owners);

//Numbers
console.log(movements);
//console.log(movements.sort());
//return <0 , A ,B keep order
//return > 0, B ,A switch order

//Ascending
// movements.sort((a,b) => {
//     if(a>b) return 1;
//     if(b>a) return -1;
// });
movements.sort((a,b) => a-b);
console.log(movements);

//Descending
// movements.sort((a,b) => {
//   if(a>b) return -1;
//   if(b>a) return 1;
// });

movements.sort((a,b) => b-a);
console.log(movements);
*/

/*
const arr = [1,2,3,4,5,6,7];

//Empty array
const x= new Array(7);
console.log(x);
//console.log(x.map(()=> 5));
x.fill(1,3);
console.log(x);

arr.fill(23,2,6);
console.log(arr);

//Array.from
const y = Array.from({length:7},() => 1);
console.log(y);

const z = Array.from({length:7}, (_,i) => i+1);
console.log(z);

const movementsUI = Array.from(document
  .querySelectorAll('.movements__value'));

  console.log(movementsUI);

  labelBalance.addEventListener('click',function(){
     const movementsUI = Array.from(
         document.querySelectorAll('.movements__value'),
         el => Number(el.textContent.replace('$',''))
     );
     console.log(movementsUI);

    const movementsUI2 = [...document.querySelectorAll('.movements__value')];

  });
  */
 
