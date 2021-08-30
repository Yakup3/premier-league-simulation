const modelsData = require('./data');

class Standings {
    constructor() {
        this.standings_arr = clubs();
        this.matches_arr = modelsData.data();
    }

    matches_calculation(input) {
        for (let i = 0; i < this.matches_arr.length; i++) {
            if (this.matches_arr[i].match_id == input.id) {

                this.matches_arr[i].ats = input.ats;
                this.matches_arr[i].hts = input.hts;
                this.matches_arr[i].a_pts = input.a_pts;
                this.matches_arr[i].h_pts = input.h_pts;
            }
        }
        return this.matches_arr;
    }

    standings_calculation(input) {

        const a_team = (t) => {
            return t.name == input.at;
        }

        const a_index = this.standings_arr.findIndex(a_team);

        this.standings_arr[a_index].mp = ++this.standings_arr[a_index].mp;

        if (input.ats > input.hts) {
            this.standings_arr[a_index].w = ++this.standings_arr[a_index].w;
        } else if (input.ats == input.hts) {
            this.standings_arr[a_index].e = ++this.standings_arr[a_index].e;
        }
        else {
            this.standings_arr[a_index].l = ++this.standings_arr[a_index].l;
        }


        this.standings_arr[a_index].gf += input.ats;
        this.standings_arr[a_index].ga += input.hts;
        this.standings_arr[a_index].pts += input.a_pts;

        const h_team = (t) => {
            return t.name == input.ht;
        }

        const h_index = this.standings_arr.findIndex(h_team);

        this.standings_arr[h_index].mp = ++this.standings_arr[h_index].mp;

        if (input.ats < input.hts) {
            this.standings_arr[h_index].w = ++this.standings_arr[h_index].w;
        } else if (input.ats == input.hts) {
            this.standings_arr[h_index].e = ++this.standings_arr[h_index].e;
        }
        else {
            this.standings_arr[h_index].l = ++this.standings_arr[h_index].l;
        }

        this.standings_arr[h_index].gf += input.hts;
        this.standings_arr[h_index].ga += input.ats;
        this.standings_arr[h_index].pts += input.h_pts;

        this.standings_arr = this.standings_arr.sort((a, b) => {
            if (a.pts == b.pts) {
                if (a.w == b.w) {
                    if (a.e == b.e) {
                        if (a.l == b.l) {
                            if (a.gf - a.ga == b.gf - b.ga) {
                                if (a.name > b.name) {
                                    return 1;
                                } else {
                                    return -1;
                                }
                            } else if (a.gf - a.ga > b.gf - b.ga) {
                                return -1;
                            } else {
                                return 1;
                            }
                        } else if (a.l > b.l) {
                            return -1;
                        } else {
                            return 1;
                        }
                    } else if (a.e > b.w) {
                        return 1;
                    } else {
                        return -1;
                    }
                } else if (a.w > b.w) {
                    return 1;
                } else {
                    return -1;
                }
            } else if (a.pts > b.pts) {
                return -1;
            } else {
                return 1;
            }
        })

        for (let i = 0; i < this.standings_arr.length; i++) {
            this.standings_arr[i].order = i + 1;
        }

        return this.standings_arr;
    }
}

function clubs() {
    const arr = [
        {
            _id: '610a7f56fee76503ec91e341',
            order: 1,
            name: 'Arsenal',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e344',
            order: 2,
            name: 'Aston Villa',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e349',
            order: 3,
            name: 'Bournemouth',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e33d',
            order: 4,
            name: 'Chelsea',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e347',
            order: 5,
            name: 'Crystal Palace',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e343',
            order: 6,
            name: 'Everton',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e33e',
            order: 7,
            name: 'Leicester City',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e33c',
            order: 8,
            name: 'Liverpool',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e33a',
            order: 9,
            name: 'Manchester City',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e33b',
            order: 10,
            name: 'Manchester Utd',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e345',
            order: 11,
            name: 'Newcastle',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e34d',
            order: 12,
            name: 'Norwich City',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e348',
            order: 13,
            name: 'Southampton',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e342',
            order: 14,
            name: 'Stoke City',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e34a',
            order: 15,
            name: 'Sunderland',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e346',
            order: 16,
            name: 'Swansea',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e340',
            order: 17,
            name: 'Tottenham',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e34b',
            order: 18,
            name: 'Watford',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e34c',
            order: 19,
            name: 'West Brom',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        },
        {
            _id: '610a7f56fee76503ec91e33f',
            order: 20,
            name: 'West Ham',
            mp: 0,
            w: 0,
            e: 0,
            l: 0,
            gf: 0,
            ga: 0,
            pts: 0,
            __v: 0
        }
    ]
    return arr;
}

module.exports = { Standings }