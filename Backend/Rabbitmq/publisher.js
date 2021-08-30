const amqp = require('amqplib');
const fs = require('fs');

connect();

async function connect() {
    try {
        // ** Connecting to server and creating channel
        const server = 'amqp://localhost:5672';
        const connection = await amqp.connect(server);
        const channel = await connection.createChannel();
        await channel.assertQueue('jobs');

        // ** Publishing one by one
        function task(dict, i) {
            setTimeout(function () {
                // Add tasks to do
                channel.sendToQueue('jobs', Buffer.from(JSON.stringify(dict)))
                console.log(`Job sent successfully ${JSON.stringify(dict)}`);
                console.log('');
            }, 800 * i);
        }

        fs.readFile('goal_data1.json', 'utf8', (error, data) => {
            if (error) {
                console.log(error);
            }

            const dict = JSON.parse(data);

            for (let i = 0; i < 500; i++) {
                task(dict[i], i);
            }
        });
    } catch (err) {
        console.log(err);
    }
}