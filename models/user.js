class User {
    constructor(id, name, email, phone , role_id, role_name, city_id, city_name, state_id , state_name ,country_id, country_name){
        this.id = id;
        this.name = name;
        this.email = email;
       // this.password = password;
        this.phone = phone;
        this.role_id = role_id;
        this.role_name = role_name;
        this.city_id = city_id;
        this.city_name = city_name;
        this.state_id = state_id;
        this.state_name = state_name;
        this.country_id = country_id;
        this.country_name = country_name;
    }
}

module.exports = User;