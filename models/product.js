class Product {
    constructor(id, name, image, description, price, category_id){
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
        this.category_id = category_id;
    }
}

module.exports = Product;