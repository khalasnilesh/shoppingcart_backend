const express = require('express');
const countryController = require("../controllers/country");
const router = express.Router();

router.get('/country', countryController.country);
router.get('/state/:id', countryController.state);
router.get('/city/:id', countryController.city);

module.exports = router;