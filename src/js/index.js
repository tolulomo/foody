// Global app controller
import Search from './model/Search';
import {elements, loader, clearLoader} from './view/base';
import * as sv from './view/SearchView';
import Recipes from './model/Recipe';
import List from './model/List';
import * as lv from './view/listView'
import * as rv from './view/recipeView';
import likes from './model/Likes';
import { likeListing, removeList } from './view/likeView';


const state = {};
window.state = state;

const rController = async () => {
    const query = sv.getQuery();
    sv.clearQuery();
    sv.clearResList();
    sv.clearPaging();
    
    state.searchQ = new Search(query);

    try {
        loader(elements.resultsloader);
        await state.searchQ.getRecipe();
        clearLoader();
        sv.clearPaging();
        sv.showResult(state.searchQ.recipe);
    } catch(e){
        alert(e);
    }

}
elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    rController();
});

elements.resultpaging.addEventListener('click', e =>{
    const goTo = parseInt(e.target.closest('.btn-inline').dataset.goto);
    if(goTo){
        sv.clearResList();
        sv.clearPaging();
        sv.showResult(state.searchQ.recipe, goTo);
    } 

});

const chklocalstorage = async () =>{
    removeList();
    if(!state.likes) state.likes = new likes();
    try{
        await state.likes.recallLikes();
        //console.log(state.likes.liked);
        likeListing(state.likes.liked);
    } catch(e){
        console.log(e);
    }
};

const recipeController = async () =>{
    chklocalstorage();
    //#54346
    const Id = window.location.hash.replace('#', '');
    if(Id){
        state.recip = new Recipes(Id);
        state.recip.Id = Id;
        if(state.searchQ) sv.highlightSearch(Id);    
        try {
            rv.clearRecipe();
            loader(elements.recipe);
            await state.recip.iQuery();

            state.recip.servings();
            state.recip.timing();
            state.recip.parseIngredient();
            clearLoader();
            rv.recipeRender(state.recip);
        } catch (e) {
            console.log(e);
        }
    }
}

['load', 'hashchange'].forEach(e =>{window.addEventListener(e, recipeController)});

const listController = () => {
    state.list = new List();
    state.recip.ingredients.forEach((curs) =>{
        const newList = state.list.addItem(curs.count, curs.unit, curs.ing);
        lv.shoppingList(newList.id, newList.count, newList.unit, newList.ing);
    });
};

const likeController = () => {
    removeList();
    if(state.likes.checkIfLikes(state.recip.Id)){
        state.likes.deleteLikes(state.recip.Id);
        state.likes.deleteOffline(state.recip.Id);
        //likeListing(state.likes.liked);
    } else {
        state.likes.addLikes(state.recip);
        state.likes.storeOffline(state.likes);
        //likeListing(state.likes.liked);
    }
    likeListing(state.likes.liked);
}

elements.shopping.addEventListener('click', eee =>{
    const listID = eee.target.closest('.shopping__item').dataset.item;
    //delete
    if(eee.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(listID);
        lv.removeItem(listID);
    }else if(eee.target.matches('.update-count, .update-count *')){ //update
        const newVal = parseFloat(eee.target.value);
        state.list.updateItem(listID, newVal);
    }
})

elements.recipe.addEventListener('click', e =>{
    if(e.target.matches('.decrease, .decrease *')){
        if(parseInt(rv.myDOM.servings().textContent, 10) > 1){
            state.recip.adjustServings('dec');
            rv.myDOM.adjustServings(state.recip);
        }
    } else if(e.target.matches('.increase, .increase *')){
        state.recip.adjustServings('inc');
        rv.myDOM.adjustServings(state.recip);
    } else if(e.target.matches('.recipe__btn-add, .recipe__btn-add *')){
        listController();
    }else if(e.target.matches('.recipe__love, .recipe__love *')) {
        likeController();
    }
});

