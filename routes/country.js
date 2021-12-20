const express = require('express');
const countryController = require("../controllers/country");
const router = express.Router();

router.get('/country', countryController.country);
router.get('/state', countryController.state);
router.get('/city', countryController.city);

module.exports = router;