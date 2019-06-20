'use strict';

const auth = require('../controllers/authController');

module.exports = function (app) {
    /**
     * Return token partner depending on his key
     */
    app.post('/api/login/partner/', auth.logPartner);
    
    /**
     * Connect user using email + password
     */
    app.post('/api/login/', auth.passport.authenticate('login'), (req, res) => {
        res.send(req.user);
    });
};
