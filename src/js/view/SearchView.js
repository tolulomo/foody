import {elements} from './base';

export const getQuery = () =>elements.searchQuery.value;
export const clearQuery = () =>{
    elements.searchQuery.value = '';
}
export const clearResList = () => {
    elements.resultList.innerHTML = '';
}
export const clearPaging = () => {
        elements.resultpaging.innerHTML = ''; 
}

export const titleShortner = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(/\W/).reduce((acc, cur) =>{
            if((acc + cur.length) <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        },0)
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}
const result = rr => {
    const data = `
    <li>
        <a class="results__link" href="#${rr.recipe_id}">
            <figure class="results__fig">
                <img src="${rr.image_url}" alt="${rr.publisher}">
                    </figure>
            <div class="results__data">
                <h4 class="results__name">${titleShortner(rr.title)}</h4>
                <p class="results__author">${rr.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.resultList.insertAdjacentHTML('afterbegin', data)
}

const pHtml = (x, opt) =>`
    <button class="btn-inline results__btn--${opt}" data-goto="${opt == 'prev' ? x-1 : x+1}">
        <span>Page ${opt == 'prev' ? x-1 : x+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${opt == 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const paging = (recipe, page, resPerPage) => {
    let btn;
    const pages = Math.ceil(recipe.length/resPerPage);
    if(page === 1 && pages > 1) {
        btn = pHtml(page, 'next');
    }else if(page < pages && pages > 1){
        btn =`
            ${pHtml(page, 'prev')}
            ${pHtml(page, 'next')}
        `;
    }else if (page === pages && pages >1){
        btn = pHtml(page, 'prev')
    }
    elements.resultpaging.insertAdjacentHTML('afterbegin', btn);
}
export const showResult = (recipe, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipe.slice(start, end).forEach(result);
    paging(recipe, page, resPerPage);
};

export const highlightSearch = id => {
    Array.from(document.querySelectorAll('.results__link')).forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');      
}; 