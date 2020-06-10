const router = require('express').Router();
const OAuthServer = require('express-oauth-server');
const OAuthModel = require('../models/oauth');
const mongoose = require('mongoose');

let oauth = new OAuthServer({
    model: OAuthModel,
    debug: true
});

router.post('/oauth/access_token', oauth.token({
    requireClientAuthentication: {
        authorization_code: false,
        refresh_token: false
    }
}));

router.get('/oauth/authenticate', async (req, res, next) => {
    return res.render('authenticate')
});

router.post('/oauth/authenticate', async (req, res, next) => {

    let UserModel = mongoose.model('User');
    req.body.email = await UserModel.findOne({ email: req.body.email });

    return next();
}, oauth.authorize({
    authenticateHandler: {
        handle: req => {
            return req.body.email;
        }
    }
}));

module.exports = router;