module.exports = {
    isProduction: false || process.env.isProduction,
    mongoDbUrl:'mongodb+srv://dre123:6TyT6wxrwqjMv3iP@cluster0-ztdrl.mongodb.net/projectdb?retryWrites=true&w=majority' || process.env.mongoDbUrl,
    salt: 'a5828e9d6052dc3b14a93e07a5932dd9' || process.env.salt
};