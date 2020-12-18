const amqp = require('amqplib')

console.log('WORKINGSS')

async function main(){

    const queue = 'employees'
    const newQueue = 'clients'

    const messages = [
        {"name": "Random1", "enterprise": "Slack"},
        {"name": "Random2", "enterprise": "Youtube"},
        {"name": "Random3", "enterprise": "Slack"},
        {"name": "Random4", "enterprise": "Twitch"},
        {"name": "Random5", "enterprise": "Slack"},
        {"name": "Random6", "enterprise": "Google"},
    ]
    const messages2 = [
        {"name": "r1", "enterprise": "Client"},
        {"name": "r2", "enterprise": "Client"},
        {"name": "r3", "enterprise": "Client"},
        {"name": "r4", "enterprise": "Client"},
        {"name": "r5", "enterprise": "Client"},
        {"name": "r6", "enterprise": "Client"},
    ]

    try{
        const connection = await amqp.connect('amqp://rabbitmq')
        console.log('Connection Created')

        const channel = await connection.createChannel()
        console.log('Channel Created')

        let response = await channel.assertQueue(queue)
        console.log('Queue Created')


        //sending messages to the queue1
        for(let message in messages){
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(messages[message])))

            console.log(`Message sent to queue: ${queue}`)
            console.log(`Message: ${JSON.stringify(messages[message])}`)
        }

        //creating second queue
        response = await channel.assertQueue(newQueue)
        console.log('Queue2 Created')

        for(let message in messages2){
            await channel.sendToQueue(newQueue, Buffer.from(JSON.stringify(messages2[message])))

            console.log(`Message sent to queue: ${newQueue}`)
            console.log(`Message: ${JSON.stringify(messages2[message])}`)
        }

    }
    catch(e){
        console.log(e)
    }
}

main()