class User {
    constructor(id, name, email, phone , role_id, city_id, state_id , country_id){
        this.id = id;
        this.name = name;
        this.email = email;
       // this.password = password;
        this.phone = phone;
        this.role_id = role_id;
        this.city_id = city_id;
        this.state_id = state_id;
        this.country_id = country_id;
    }
}

module.exports = User;