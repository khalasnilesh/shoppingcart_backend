const express = require('express');
const countryController = require("../controllers/country");
const router = express.Router();

router.get('/country', countryController.country);
router.get('/state/:countryId', countryController.getstateById);
router.get('/city', countryController.getcityById);

module.exports = router;