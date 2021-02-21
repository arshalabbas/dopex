const { MONGO_DB } = require('../utils/keysExport');

const mongoClient = require('mongodb').MongoClient;

const state = {
    db: null
}
//connection
module.exports.connect = (done) => {
    const url = MONGO_DB;
    const dbname = "dopex";

    mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
        if (err) return done(err);
        state.db = data.db(dbname);
        done();
    });
}

//to get the db
module.exports.get = () => {
    return state.db;
}

//used collections
module.exports.collections = {
    CALL_CHANNEL: "callChannel"
}