const amqp = require('amqplib');
const { MatchFactory } = require('./match')
const Database = require('./database');
const StandingsDatabase = require('./standingDatabase');
const { Standings } = require('./standingsCalculation');
const standingsCalculation = new Standings();

async function connect(socketServer) {
    try {
        // ** Connecting to server and creating channel
        const server = 'amqp://localhost:5672';
        const connection = await amqp.connect(server);
        const channel = await connection.createChannel();
        // const result = channel.assertQueue('jobs');


        // ** Consuming data
        channel.consume('jobs', message => {
            const input = JSON.parse(message.content);

            const matchId = input.id_odsp;
            const match = MatchFactory.getMatch(matchId);

            // ** Calculating score and point
            const result = match.calculation(input);

            let standings = [];
            let matches = [];

            if (result.event_type == 'finish') {
                Database.update(result);
                StandingsDatabase.update_standings(result);
                standings = standingsCalculation.standings_calculation(result);
                socketServer.send_standings(standings);
            }

            matches = standingsCalculation.matches_calculation(result);

            // ** Sending new dict to socket
            socketServer.send(matches);

            channel.ack(message);
        })
    } catch (err) {
        console.error(err);
    }
}

module.exports = { connect };