import View from './View.js';

import icons from 'url:../../img/icons.svg';// parcel 2

class recipeView extends View{
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We couldnot find that recipe. Please try another one!';
  _message = '';
  
  // Function to convert decimal to fraction
  decimalToFraction = (num) => {
    if (!num) return '';
  
    const tolerance = 1.0E-6;  
    let numerator = 1;
    let denominator = 1;
    let lower_n = 0;
    let lower_d = 1;
    let upper_n = 1;
    let upper_d = 0;
  
    while (true) {
      numerator = lower_n + upper_n;
      denominator = lower_d + upper_d;
  
      if (denominator * (num + tolerance) < numerator) {
        upper_n = numerator;
        upper_d = denominator;
      } else if (numerator < (num - tolerance) * denominator) {
        lower_n = numerator;
        lower_d = denominator;
      } else {
        break;
      }
    }
  
    // Simplify fraction
    const gcd = (a, b) => (b ? gcd(b, a % b) : a);
    const commonDivisor = gcd(numerator, denominator);
    numerator /= commonDivisor;
    denominator /= commonDivisor;
  
    // Return simplified fraction or whole number
    if (denominator === 1) return `${numerator}`;
    
    // Handle mixed fractions
    if (numerator > denominator) {
      const whole = Math.floor(numerator / denominator);
      const remainder = numerator % denominator;
      return remainder === 0
        ? `${whole}`
        : `${whole} ${remainder}/${denominator}`;
    }
  
    return `${numerator}/${denominator}`;
  };
  
  addHandlerRender(handler){
    //console.log(['hashchange', 'load']);  
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler){
      this._parentElement.addEventListener('click',function(e){
          const btn = e.target.closest('.btn--update-servings');

          if(!btn) return ;

          console.log(btn);

          const updateTo = +btn.dataset.updateTo;
         if(updateTo > 0)handler(updateTo);
      });
  }

  _generateMarkup() {
    return `         
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe_info-data recipe_info-data--minutes">${this._data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe_info-data recipe_info-data--people">${this._data.servings}</span>

          <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to= ${this._data.servings - 1}>
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to= ${this._data.servings + 1}>
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
        </div>

        <div class="recipe__user-generated">

        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(ing =>this._genMarkupIngredients(ing)).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;
  }

  _genMarkupIngredients(ing)
    {
      const fraction = ing.quantity ? this.decimalToFraction(ing.quantity) : '';
      return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${fraction}</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>`;
    }
}

export default new recipeView();