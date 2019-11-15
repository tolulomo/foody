import axios from 'axios';
import { key, proxy, recipeURL } from '../../../config'

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getRecipe() {
        try {
            const qRecipe = await axios(`${proxy}${recipeURL}?key=${key}&q=${this.query}`);
            this.recipe = qRecipe.data.recipes;
        } catch (e) {
            console.log(e);
        }
    }
}
