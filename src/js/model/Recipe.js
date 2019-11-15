import axios from 'axios';
import { key, proxy, getRecipe } from '../../../config'

/* const responseText = {"recipe": {"publisher": "Two Peas and Their Pod", "f2f_url": "http://food2fork.com/view/54346", "ingredients": ["1/4 cup unsalted butter", "1/4 cup brown sugar", "1/4 cup honey", "1/4 cup creamy peanut butter", "1 teaspoon vanilla extract", "2 cups quick oats", "1/2 cup crispy rice cereal", "3/4 cup chopped pretzels", "1/4 cup mini chocolate chips"], "source_url": "http://www.twopeasandtheirpod.com/no-bake-peanut-butter-pretzel-chocolate-chip-granola-bars/", "recipe_id": "54346", "image_url": "http://static.food2fork.com/nobakepeanutbutterpretzelchocolatechipgranolabars436b7.jpg", "social_rank": 99.99999995526439, "publisher_url": "http://www.twopeasandtheirpod.com", "title": "No-Bake Peanut Butter Pretzel Chocolate Chip Granola Bars"}};

export default class Recipes {
    constructor(query) {
        this.query = query;
    }

    async iQuery() {
        try {
            const qRecipe = await responseText;
            this.img = qRecipe.recipe.image_url;
            this.title = qRecipe.recipe.title;
            this.ingredients = qRecipe.recipe.ingredients;
            this.publisher = qRecipe.recipe.publisher;
            this.surl = qRecipe.recipe.source_url;
        } catch (e) {
            console.log(e);
        }
    }

    servings(){
        this.servings = 4;
    }

    timing(){
        this.timing = eval(this.ingredients.length/4);
    }
    

    parseIngredient(){
        const oldUnit = ['teaspoons','teaspoon','cups','tablespoons','tablespoon','ounces','ounce','pounds'];
        const newUnit = ['tsp','tsp','cup','tbs','tbs','oz','oz','pound'];
        let ingredient;
        const newIngredient = this.ingredients.map(el => {
            let ingr = el.toLowerCase();
            oldUnit.forEach((cur, i) => {
                  ingr = ingr.replace(cur, newUnit[i]);
            });
            ingr = ingr.replace(/[^\w.\s/-]/g, '').split(' ');
            let iIndex = ingr.findIndex(ele => newUnit.includes(ele));
            if(iIndex > -1){
                let count;
                const arrCount = ingr.slice(0, iIndex);
                if(arrCount.length === 1){
                    count = eval(ingr[0].replace('-', '+'));
                }else if(arrCount.length > 1){
                    count = eval(ingr[iIndex - 1].replace('-', '+'));
                }
                ingredient = {
                    count,
                    unit: ingr[iIndex],
                    ing: ingr.slice(iIndex + 1).join(' ')
                } 
            }else if(parseInt(ingr[0], 10)){
                ingredient = {
                    count: eval(ingr[0].replace('-', '+')),
                    unit: '',
                    ing: ingr.slice(1).join(' ')
                }
            } else if(iIndex === -1){
                //Not Found
                ingredient = {
                    count: 1,
                    unit: '',
                    ing: ingr.join(' ')
                };
            }
            return ingredient;
        });
        return this.ingredients = newIngredient;
    }

    adjustServings(type){
        const newServings = type === 'inc' ? this.servings + 1 : this.servings - 1;
        this.ingredients.forEach(el => el.count *= (newServings/this.servings))
        this.servings = newServings;
    };

} */

// ===== To Use Later =========
export default class Recipes {
    constructor(query) {
        this.query = query;
    }

    async iQuery() {
        try {
            const qRecipe = await axios(`${proxy}${getRecipe}?key=${key}&rId=${this.query}`);
            this.img = qRecipe.data.recipe.image_url;
            this.title = qRecipe.data.recipe.title;
            this.ingredients = qRecipe.data.recipe.ingredients;
            this.publisher = qRecipe.data.recipe.publisher;
            this.surl = qRecipe.data.recipe.source_url;
        } catch (e) {
            console.log(e);
        }
    }

    servings(){
        this.servings = 4
    }

    timing(){
        this.timing = eval(this.ingredients.length/4);
    }
    

    parseIngredient(){
        const oldUnit = ['teaspoons','teaspoon','cups','tablespoons','tablespoon','ounces','ounce','pounds'];
        const newUnit = ['tsp','tsp','cup','tbs','tbs','oz','oz','pound'];
        let ingredient;
        const newIngredient = this.ingredients.map(el => {
            let ingr = el.toLowerCase();
            oldUnit.forEach((cur, i) => {
                  ingr = ingr.replace(cur, newUnit[i]);
            });
            ingr = ingr.replace(/[^\w.\s/-]/g, '').split(' ');
            let iIndex = ingr.findIndex(ele => newUnit.includes(ele));
            if(iIndex > -1){
                let count;
                const arrCount = ingr.slice(0, iIndex);
                if(arrCount.length === 1){
                    count = eval(ingr[0].replace('-', '+'));
                }else if(arrCount.length > 1){
                    count = eval(ingr[iIndex - 1].replace('-', '+'));
                }
                ingredient = {
                    count,
                    unit: ingr[iIndex],
                    ing: ingr.slice(iIndex + 1).join(' ')
                } 
            }else if(parseInt(ingr[0], 10)){
                ingredient = {
                    count: eval(ingr[0].replace('-', '+')),
                    unit: '',
                    ing: ingr.slice(1).join(' ')
                }
            } else if(iIndex === -1){
                //Not Found
                ingredient = {
                    count: 1,
                    unit: '',
                    ing: ingr.join(' ')
                };
            }
            return ingredient;
        });
        return this.ingredients = newIngredient;
    }

    adjustServings(type){
        const newServings = type === 'inc' ? this.servings + 1 : this.servings - 1;
        this.ingredients.forEach(el => el.count *= (newServings/this.servings))
        this.servings = newServings;
    };

}
