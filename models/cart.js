class Cart {
    constructor(id,user_id, user_name,product_id, qty, product_name, product_description, product_image, product_price, discount_id){
        this.id = id;
        this.user_id = user_id;
        this.user_name = user_name;
        this.product_id = product_id;
        this.qty = qty;
        this.proudct_name = product_name;
        this.product_description = product_description;
        this.product_image = product_image;
        this.product_price = product_price;
        this.discount_id = discount_id;
    }
}

module.exports = Cart;