const { MONGO_DB } = require('../utils/keysExport');

const mongoClient = require('mongodb').MongoClient;

const state = {
    db: null
}

module.exports.connect = (done) => {
    const url = MONGO_DB;
    const dbname = "dopex";

    mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
        if (err) return done(err);
        state.db = data.db(dbname);
        done();
    });
}

module.exports.get = () => {
    return state.db;
}