const {DB} = require("../../components/pg_db");
const moment = require("moment/moment");
const db = require("pg/lib/client");

class AdminController {
    constructor() {
        //
    }
    async list(req, res, next)
    {
        let {page, perPage} = req.params;
        page = page || 1;
        perPage = perPage || 10;
        const result = await DB('SELECT $1::text as message');

        let sendData = {data: {}, errors: {}};

        return res.send(sendData);
    }

    async createPromo(req, res, next)
    {
        let {name, active, expiration_date} = req.body;

        return res.send({});
    }

    async deletePromo(req, res, next)
    {
        const {promo_id} = req.params;

        return res.send({});
    }

    async emailBind(req, res, next)
    {
        let {email, promo_id} = req.body;


        return res.send({});
    }

    async emailUncouple(req, res, next)
    {
        let {email, promo_id} = req.body;

        return res.send({});
    }

}

module.exports = AdminController;