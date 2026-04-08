const express = require('express');
const router = express.Router();

const fs = require("node:fs");
// const md5 = require('md5');
// const {extFrom} = require('../components/mimeToExt');
// const {UserController} = require('../http/controllers/admin/UserController');
const AdminController = require('../http/controllers/adminController');

const group = (callback) => {
    callback(router);
    return router;
};

// router.get('/client', new ClientController().client);
// router.get('/client/teams', new ClientController().teams);
// router.get('/client/settings', new ClientController().settings);
// router.get('/client/portfolios', new ClientController().portfolios);
// router.get('/client/categories', new ClientController().categories);
// router.get('/client/team/:team_id([1-9][0-9]{0,})', new ClientController().team);
// router.get('/client/setting/:setting_id([1-9][0-9]{0,})', new ClientController().setting);


router.use('/admin', group((adminRouter)=>{
    adminRouter.get('/promo/list', new AdminController().list);
    adminRouter.post('/promo/create', new AdminController().createPromo);
    adminRouter.delete('/promo/delete/:promo_id', new AdminController().deletePromo);
    adminRouter.post('/email/bind', new AdminController().emailBind);
    adminRouter.post('/email/uncouple', new AdminController().emailUncouple);

}));

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});



module.exports = router;
