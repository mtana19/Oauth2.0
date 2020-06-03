let OAuthAccessTokenModel = mongoose.model('OAuthAccessToken', new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'OAuthClient'},
    accessToken: { type: String },
    accessTokenExpiresAt: { type: Date },
    refreshToekn: { type: String },
    refreshTokenExpiresAt: { type: Date },
    scope: {type: String }
},{
    timestamps: true
}), 'oauth_access_tokens');

let OAuthCodeModel = mongoose.model('OAuthCode', new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'OAuthClient'},
    authorizationCode: { type: String },
    expiresAt: { type: Date },
    scope: { type: String }
},{
    timestamps: true
}), 'oauth_auth_codes');

let OAuthClientModel = mongoose.model('OAuthClient', new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    clientId: { type: String },
    clientSecret: { type: String },
    redirectUris: {type: Array },
    grants: { type: Array },
},{
    timestamps: true
}), 'oauth_clients');

module.exports.getAccessToken = async (accessToken) => {
    let _accessToken = await OAuthAccessTokenModel.findOne({ accessToken: accessToken })
    .populate('user')
    .populate('client');

    if(!_accessToken) {
        return false;
    }

    _accessToken = _accessToken.toObject();

    if(!_accessToken.user) {
        _accessToken.user = {};
    }
    return _accessToken;
};

module.exports.refreshTokenModel = (refreshToken) => {
    return OAuthAccessTokenModel.findOne({ refreshToken })
    .populate('user')
    .populate('client');
};

module.exports.getAuthorizationCode = (code) => {
    return OAuthCodeModel.find({ authorizationCode: code })
    .populate('user')
    .populate('client');
};

module.exports.getClient = (clientId, clientSecret) => {
    let params = { clientId: clientId };
    if(clientSecret) {
        params.clientSecret = clientSecret;
    }
    return OAuthClientModel.findOne(params);
};

module.exports.getUser = async (username, password)