const mongoose = require('mongoose');
const models = require('./standingModel');
const url = 'mongodb://localhost/premiere-league-standings';

const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });
const Models = connect.model('model', models);

async function posting_standings(input) {

    const teams = new Models({
        order: 0,
        name: input.name,
        mp: 0,
        w: 0,
        e: 0,
        l: 0,
        gf: 0,
        ga: 0,
        pts: 0
    })

    try {
        await teams.save();
    } catch (err) {
        console.log(err);
    }
}

async function update_standings(input) {

    let a_team = await Models.find();

    a_team = a_team.filter(data => data.name == input.at);

    a_team[0].mp = ++a_team[0].mp;
    if (input.ats > input.hts) {
        a_team[0].w = ++a_team[0].w;
    } else if (input.ats < input.hts) {
        a_team[0].l = ++a_team[0].l;
    } else {
        a_team[0].e = ++a_team[0].e;
    }
    a_team[0].gf += input.ats;
    a_team[0].ga += input.hts;
    a_team[0].pts += input.a_pts;

    let h_team = await Models.find();

    h_team = h_team.filter(data => data.name == input.ht);

    h_team[0].mp = ++h_team[0].mp;
    if (input.hts > input.ats) {
        h_team[0].w = ++h_team[0].w;
    } else if (input.hts < input.ats) {
        h_team[0].l = ++h_team[0].l;
    } else {
        h_team[0].e = ++h_team[0].e;
    }
    h_team[0].gf += input.hts;
    h_team[0].ga += input.ats;
    h_team[0].pts += input.a_pts;

    try {
        await h_team[0].save();
        await a_team[0].save();
    } catch (err) {
        console.error(err);
    }
}

module.exports = { posting_standings, update_standings };