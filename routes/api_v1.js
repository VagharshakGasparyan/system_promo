const express = require('express');
const router = express.Router();

const AdminController = require('../http/controllers/adminController');


router.get('/users/list', new AdminController().users);
router.get('/promo/list', new AdminController().list);
router.post('/promo/create', new AdminController().createPromo);
router.delete('/promo/delete/:promo_id', new AdminController().deletePromo);
router.post('/email/bind', new AdminController().emailBind);
router.post('/email/uncouple', new AdminController().emailUncouple);

module.exports = router;
