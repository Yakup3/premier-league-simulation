const mongoose = require('mongoose');
const models = require('./model');
const url = 'mongodb://localhost/premiere-league-matches';

const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });
const Models = connect.model('Model', models);

async function posting(input) {

    const match = new Models({
        match_id: input.id,
        hts: input.hts,
        ats: input.ats,
        ht: input.ht,
        at: input.at,
        h_pts: input.h_pts,
        a_pts: input.a_pts,
        date: input.date,
    })

    try {
        const m = await match.save()
    } catch (err) {
        console.log(err);
    }

}

async function update(input) {
    const match = await Models.findOneAndUpdate(input.id);

    match.hts = input.hts;
    match.ats = input.ats;
    match.a_pts = input.a_pts;
    match.h_pts = input.h_pts;

    try {
        await match.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = { posting, update };