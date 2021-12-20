const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID
} = process.env;

assert(PORT , 'PORT is required');
assert(HOST , 'HOST is required');

module.exports = {
    port : PORT,
    host : HOST,
    url : HOST_URL,
    firebaseConfig : {
        apiKey: "AIzaSyCuDJH2YOUc_QaFEpiyzQkMv1qO-yampdg",
        authDomain: "shoppingcart-8c23f.firebaseapp.com",
        projectId: "shoppingcart-8c23f",
        storageBucket: "shoppingcart-8c23f.appspot.com",
        messagingSenderId: "162461639042",
        appId: "1:162461639042:web:ba1130e5dc8578921bef9b"
    }
}