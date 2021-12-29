class Product {
    constructor(id, name, image, description, price, category_id , category_name , show_on){
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
        this.category_id = category_id;
        this.category_name = category_name;
        this.show_on = show_on;
    }
}

module.exports = Product;