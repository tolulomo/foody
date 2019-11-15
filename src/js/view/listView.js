import {elements} from './base';

export const removeItem = (id) => {
    const element = document.querySelector(`[data-item="${id}"]`);
    element.parentNode.removeChild(element);
}
export const shoppingList = (id, count, unit, ingredient) =>{
    const markUp = `
        <li class="shopping__item" data-item="${id}">
            <div class="shopping__count">
                <input type="number" value="${count}" step="${count}" class="update-count">
                <p>${unit}</p>
            </div>
            <p class="shopping__description">${ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markUp);
}