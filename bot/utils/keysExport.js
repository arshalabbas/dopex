let config;

try {
    config = require('../../config.json');
} catch (err) {
    config = null;
}

exports.OWNER = config ? config.OWNER : process.env.OWNER;
exports.TOKEN = config ? config.TOKEN : process.env.TOKEN;
exports.PREFIX = config ? config.PREFIX : process.env.PREFIX;
exports.STAT_CHANNEL = config ? config.STAT_CHANNEL : process.env.STAT_CHANNEL;
exports.GIPHY_TOKEN = config ? config.GIPHY_TOKEN : process.env.GIPHY_TOKEN;
exports.MONGO_DB = config ? config.MONGO_DB : process.env.MONGO_DB;