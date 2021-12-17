const { credential } = require('firebase-admin');
const firebase = require('firebase-admin');
const config = require('./config');

var serviceAccount = require('./gcloud.json');

const db = firebase.initializeApp(
    {credential : firebase.credential.cert(serviceAccount)});

module.exports = db;