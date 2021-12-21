class Product {
    constructor(id, name, image, description, price, category_id ,show_on){
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
        this.category_id = category_id;
        this.show_on = show_on;
    }
}

module.exports = Product;