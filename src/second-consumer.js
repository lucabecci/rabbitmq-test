const amqp = require('amqplib')

async function main(){

    const queue = 'clients'

    try{
        const connection = await amqp.connect('amqp://rabbitmq')
        console.log('Connection Created')

        const channel = await connection.createChannel()
        console.log('Channel Created')

        const response = await channel.assertQueue(queue)
        console.log('Queue Created')

        //receiving messages

        console.log(`receiving messages from ${queue}`)
        channel.consume(queue, message => {
            let clients = JSON.parse(message.content.toString())
            console.log(`Received employee  ${clients.name} \n`)
            console.log(clients)
        })

    }
    catch(e){
        console.log(e)
    }
}

main()