import {elements} from './base';
import {titleShortner} from './SearchView';

const dataView = (data) => {
    const htmlData = `
            <li>
            <a class="likes__link" href="#${data.Id}">
                <figure class="likes__fig">
                    <img src="${data.img}" alt="${data.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${titleShortner(data.title)}</h4>
                    <p class="likes__author">${data.publisher}</p>
                </div>
            </a>
            </li>`;
    elements.likeList.insertAdjacentHTML('beforeend', htmlData);
}

export const removeList = () => {
    elements.likeList.innerHTML = '';
}

export const likeListing = (idata) => {
    idata.forEach(dataView);
};