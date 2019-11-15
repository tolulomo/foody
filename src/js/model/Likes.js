export default class Likes {
    constructor() {
        this.liked = [];
    }

    addLikes(recipe){
        const lrec = {
            Id: recipe.Id,
            img: recipe.img,
            title: recipe.title,
            publisher: recipe.publisher
        };
        if(!this.checkIfLikes(recipe.Id)){
            if(lrec){
                this.liked.push(lrec);
                return this.liked;
            }
        }
    };

    deleteLikes(id){
        const delIndex = this.liked.findIndex(el => el === id);
        this.liked.splice(delIndex, 1);
        return this.liked;
    };

    checkIfLikes(id){
        let ifLiked;
        if(this.liked) {
            ifLiked = this.liked.findIndex(el => el.Id === id) != -1
        }
        return ifLiked;
    };

    onlineCheck(){
        let oData;
        if(window.localStorage.length){
            oData = JSON.parse(window.localStorage.getItem('mdata'));  
        }
        return oData;
    }

    recallLikes(){
        const oData = this.onlineCheck();
        if(oData) oData.liked.forEach(el => this.addLikes(el));
    };

    deleteOffline(id){
        const oData = this.onlineCheck();
        if(oData) {
            window.localStorage.clear();
            const delIndex = oData.liked.findIndex(el => el.Id === id);
            oData.liked.splice(delIndex, 1);
            if(oData.liked.length) this.storeOffline(oData.liked);
        }
    }
    storeOffline(data){
        window.localStorage.clear();
        const offlineData = JSON.stringify(data);
        window.localStorage.setItem('mdata', offlineData);
    };
}