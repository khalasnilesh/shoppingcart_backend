class Discount {
    constructor(id, promo,disc_perc,product_id){
        this.id = id;
        this.promo = promo;
        this.disc_perc = disc_perc;
        this.product_id = product_id;
    }
}

module.exports = Discount;