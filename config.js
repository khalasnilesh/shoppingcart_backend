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
        apiKey: "AIzaSyCnFkP2MXZBgciGQEUMuFGtqyhYtdtfg88",
        authDomain: "shoppingcart-c5585.firebaseapp.com",
        projectId: "shoppingcart-c5585",
        storageBucket: "shoppingcart-c5585.appspot.com",
        messagingSenderId: "819161390042",
        appId: "1:819161390042:web:864a4225d70cfe7723bee3"
    }
}