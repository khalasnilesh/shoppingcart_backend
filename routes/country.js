const express = require('express');
const contryController = require("../controllers/country");
const router = express.Router();

router.get('/country', contryController.country);

module.exports = router;