import {async } from '../../node_modules/regenerator-runtime';
import {API_URL, RES_PER_PAGE} from './config.js';
import {getJSON} from './helpers.js';

export const state ={
    recipe : {},
    search : {
      query:'',
      results: [],
      page: 1,
      resultsPerPage: RES_PER_PAGE,
    },
    bookmarks:[],
};

export const loadRecipe = async function(id){
    try{
        const data = await getJSON(`${API_URL}/${id}`);

        let {recipe} = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl : recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }

        if(state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else 
            state.recipe.bookmarked = false;

        console.log(state.recipe);
    }
    catch(err){
        //Temp Error Handling
        console.error(`${err} ERROR`);
        throw err;
    }    
}

export const loadSearchResults = async function(query){
    try{
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec =>{
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page =1;
    }
    catch(err){
        console.error(`${err} ERROR`);
        throw err;
    }
}

export const getSearchResultsPage = function(page = state.search.page){
    state.search.page = page;
    const start = (page -1)* state.search.resultsPerPage;//0 - page 1
    const end = page * state.search.resultsPerPage;  //9 - page 2

    return state.search.results.slice(start, end);
}

export const updateServings = function(newServings){
    state.recipe.ingredients.forEach(ing =>{
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
        //NewQt = oldQt * new Servings/ oldServings // 2*8/4
    });
    state.recipe.servings = newServings;
}

export const addBookMark = function(recipe){
        //Add bookMark
        state.bookmarks.push(recipe);

        //Mark current recipe as bookMark 
        if(recipe.id == state.recipe.id) state.recipe.bookmarked = true;
}

export const deleteBookmark = function(id){
        //delete a bookmark
        const index = state.bookmarks.findIndex(el => el.id === id);
        state.bookmarks.splice(index,1);

        //Mark current recipe as not bookmarked
        if(id === state.recipe.id)  state.recipe.bookmarked = false;
}