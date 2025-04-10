import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import '../../node_modules/regenerator-runtime/runtime';
import {async} from '../../node_modules/regenerator-runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipe = async function(){

  try{
     const id = window.location.hash.slice(1);
    
     if(!id) return;

    //0.Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    //1.Introducing Spinner
    recipeView.renderSpinner();
   
    //2.Loading Recipe
    await model.loadRecipe(id);
    const {recipe} = model.state;

    //3.Rendering Recipe
    recipeView.render(model.state.recipe);
    
  }
  catch(err){
    recipeView.renderError();
  }
}

const controlSearchResults = async function(){
     try{
        resultsView.renderSpinner();

        //Get search Query
          const query = searchView.getQuery();
          if(!query) return;

        //Load Search Results
          await model.loadSearchResults(query);

        //render Results
           //resultsView.render(model.state.search.results);
          resultsView.render(model.getSearchResultsPage());

        //4.Render initial pagination buttons
          paginationView.render(model.state.search);

     }
     catch(err){
         console.log(err);
     }
}

const controlPagination = function(goToPage){
  //render NEW Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //4.Render NEW pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  //Update recipe servings(in state)
  model.updateServings(newServings);
  //Update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function(){
  //1.Add or remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //2.Update recipe view
    recipeView.update(model.state.recipe);

  //3.Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const init = function(){
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
}
init();
