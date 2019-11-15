import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.item = [];
    }

    addItem(count,unit,ing) {
        const newItem = {
            id: uniqid(),
            count,
            unit,
            ing,
        }
        this.item.push(newItem);
        return newItem;
    }

    updateItem(id, newCount){
        console.log(id + ', ' + newCount);
        const index = this.item.findIndex(el => el.id === id);
        this.item[index].count = newCount;
    }

    deleteItem(id){
        const index = this.item.findIndex(el => el.id === id);
        this.item.splice(index, 1);
    }
}