import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import '../../node_modules/regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipe = async function(){

  try{
     const id = window.location.hash.slice(1);
     console.log(id);

     if(!id) return;
    //Introducing Spinner
    recipeView.renderSpinner();
   
    //1.Loading Recipe
    await model.loadRecipe(id);
    const {recipe} = model.state;

    //2.Rendering Recipe
    recipeView.render(model.state.recipe);

  }
  catch(err){
    alert(err);
  }
}

console.log(['hashchange', 'load']);  
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe));

//window.addEventListener('hashchange',showRecipe);
//window.addEventListener('load',showRecipe);
