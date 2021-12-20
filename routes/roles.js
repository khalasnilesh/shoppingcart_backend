const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', roleController.getAllRoles);
router.post('/addrole', roleController.addRole);
router.put('/updaterole/:Id' , roleController.updateRole);
router.get('/:Id', roleController.getRoleById);
router.delete('/delete/:Id', roleController.deleteRoleById);


module.exports = router;