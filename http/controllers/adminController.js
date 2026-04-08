const {DB} = require("../../components/pg_db");
const moment = require("moment/moment");
const db = require("pg/lib/client");

class AdminController {
    constructor() {
        //
    }
    async users(req, res, next)
    {
        try{
            let {page, perPage} = req.query;
            page = parseInt(page) || 1;
            page = Math.max(page, 1);
            perPage = parseInt(perPage) || 10;
            perPage = Math.min(perPage, 100);
            const offset = (page - 1) * perPage;
            const q = `SELECT * FROM users
            ORDER BY id
            LIMIT ${perPage}
            OFFSET ${offset};`;
            const result = await DB(q);
            let sendData = {data: {users: result.rows}, page, perPage, errors: {}};
            return res.send(sendData);
        }catch (e) {
            return res.send({errors: e.message});
        }
    }

    async list(req, res, next)
    {
        try{
            let {page, perPage} = req.query;
            page = parseInt(page) || 1;
            page = Math.max(page, 1);
            perPage = parseInt(perPage) || 10;
            perPage = Math.min(perPage, 100);
            const offset = (page - 1) * perPage;
            const q = `SELECT * FROM promo
            ORDER BY id
            LIMIT ${perPage}
            OFFSET ${offset};`;
            const result = await DB(q);
            let sendData = {data: {promo: result.rows}, page, perPage, errors: {}};
            return res.send(sendData);
        }catch (e) {
            return res.send({errors: e.message});
        }
    }

    async createPromo(req, res, next)
    {
        try{
            let {code, active, expiration_date, p_limit} = req.body;

            p_limit = parseInt(p_limit) || 1;
            p_limit = Math.max(p_limit, 1);
            const _expiration_date = moment(expiration_date, "DD.MM.YYYY").format("YYYY-MM-DD");
            active = active || 'true';
            const values = [active, code, p_limit, _expiration_date];
            const q = `INSERT INTO promo (active, code, p_limit, expiration_date)
                  VALUES ($1, $2, $3, $4);`;
            await DB({text: q, values});
            let sendData = {data: {info: 'The PromoCode created successfully.'}, errors: {}};
            return res.send(sendData);
        }catch (e) {
            return res.send({errors: e.message});
        }
    }

    async deletePromo(req, res, next)
    {
        try{
            const {promo_id} = req.params;
            let q = `DELETE FROM promo
                WHERE id = ${promo_id};`;
            await DB(q);
            let sendData = {data: {info: 'The PromoCode deleted successfully.'}, errors: {}};
            return res.send(sendData);
        }catch (e) {
            return res.send({errors: e.message});
        }


        return res.send({});
    }

    async emailBind(req, res, next)
    {
        try{
            let {email, promo_id} = req.body;
            const values = [promo_id, email];
            const q = `INSERT INTO promo_email (promo_id, user_email)
                  VALUES ($1, $2);`;
            await DB({text: q, values});
            let sendData = {data: {info: 'Success.'}, errors: {}};
            return res.send(sendData);
        }catch (e) {
            return res.send({errors: e.message});
        }
    }

    async emailUncouple(req, res, next)
    {
        try{
            let {email, promo_id} = req.body;
            const values = [promo_id, email];
            const q = `DELETE FROM promo_email
                WHERE promo_id = $1 AND user_email = $2;`;
            await DB({text: q, values});
            let sendData = {data: {info: 'Success.'}, errors: {}};
            return res.send(sendData);
        }catch (e) {
            return res.send({errors: e.message});
        }
    }

}

module.exports = AdminController;