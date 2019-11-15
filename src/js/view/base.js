export const elements = {
    searchForm: document.querySelector('.search'),
    searchQuery: document.querySelector('.search__field'),
    resultList: document.querySelector('.results__list'),
    resultsloader: document.querySelector('.results'),
    resultpaging: document.querySelector('.results__pages'),
    loader: 'loader',
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likeList: document.querySelector('.likes__list')

};

export const loader = (load) => {
    const loader =`
        <div class ="${elements.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>`;
    load.insertAdjacentHTML('afterbegin', loader);    
};

export const clearLoader = () => {
    const ifExist = document.querySelector(`.${elements.loader}`);
    ifExist.parentNode.removeChild(ifExist);
};