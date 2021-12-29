class Cart {
    constructor(id, product_id ,qty , product_name , product_description, product_image ,product_price){
        this.id = id;
        this.product_id = product_id;
        this.qty = qty;
        this.proudct_name = product_name,
        this.product_description = product_description,
        this.product_image = product_image,
        this.product_price = product_price
    }
}

module.exports = Cart;