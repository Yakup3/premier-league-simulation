class MatchFactory {
    static matchInstances = {};

    static getMatch(matchId) {
        if (MatchFactory.matchInstances[matchId] === undefined) {
            MatchFactory.matchInstances[matchId] = new Match(matchId);
        }
        return MatchFactory.matchInstances[matchId];
    }
}

class Match {
    constructor(id) {
        this.id = id;
        this.hts = 0;
        this.ats = 0;
        this.dict = {
            id: '',
            hts: '',
            ats: '',
            ht: '',
            at: '',
            h_pts: 0,
            a_pts: 0,
            event_type: '',
            date: '',
        }
    }

    calculation(input) {
        if (input.event_type == 'start') {
            this.start(input);
        } else if (input.event_type == 'goal') {
            this.goal(input);
        } else if (input.event_type == 'finish') {
            this.finish(input);
        }
        return this.dict;
    }

    start(input) {
        this.dict = {
            id: input.id_odsp,
            hts: this.hts,
            ats: this.ats,
            ht: input.ht,
            at: input.at,
            h_pts: 0,
            a_pts: 0,
            event_type: input.event_type,
            date: input.date,
        }
    }

    goal(input) {
        // ** Calculating score
        if (input.event_team == input.ht) {
            this.hts++;
        } else if (input.event_team == input.at) {
            this.ats++;
        }

        // ** Calculating points if scored goal
        if (this.hts > this.ats) {
            this.dict = {
                id: input.id_odsp,
                hts: this.hts,
                ats: this.ats,
                ht: input.ht,
                at: input.at,
                h_pts: 3,
                a_pts: 0,
                event_type: input.event_type,
                date: input.date,
            }
        }
        else if (this.hts < this.ats) {
            this.dict = {
                id: input.id_odsp,
                hts: this.hts,
                ats: this.ats,
                ht: input.ht,
                at: input.at,
                h_pts: 0,
                a_pts: 3,
                event_type: input.event_type,
                date: input.date,
            }
        }
        else {
            this.dict = {
                id: input.id_odsp,
                hts: this.hts,
                ats: this.ats,
                ht: input.ht,
                at: input.at,
                h_pts: 1,
                a_pts: 1,
                event_type: input.event_type,
                date: input.date,
            }
        }
    }

    finish(input) {
        // ** Calculating last points of match
        if (this.hts > this.ats) {
            this.dict = {
                id: input.id_odsp,
                hts: this.hts,
                ats: this.ats,
                ht: input.ht,
                at: input.at,
                h_pts: 3,
                a_pts: 0,
                event_type: input.event_type,
                date: input.date,
            }
        }
        else if (this.hts < this.ats) {
            this.dict = {
                id: input.id_odsp,
                hts: this.hts,
                ats: this.ats,
                ht: input.ht,
                at: input.at,
                h_pts: 0,
                a_pts: 3,
                event_type: input.event_type,
                date: input.date,
            }
        }
        else {
            this.dict = {
                id: input.id_odsp,
                hts: this.hts,
                ats: this.ats,
                ht: input.ht,
                at: input.at,
                h_pts: 1,
                a_pts: 1,
                event_type: input.event_type,
                date: input.date,
            }
        }
        this.hts = 0;
        this.ats = 0;
    }
}

module.exports = { Match, MatchFactory };