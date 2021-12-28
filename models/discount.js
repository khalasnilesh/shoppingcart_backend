class Discount {
    constructor(id, promo,disc_perc,product_id,product_name){
        this.id = id;
        this.promo = promo;
        this.disc_perc = disc_perc;
        this.product_id = product_id;
        this.product_name = product_name;
    }
}

module.exports = Discount;