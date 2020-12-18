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

        //delete messages

        console.log(`delete messages from ${queue}`)
        channel.consume(queue, message => {
            let client = JSON.parse(message.content.toString())
            channel.ack(message)
            console.log(`client deleted: ${message}`)
           
        })
        console.log(`all messages deleted`)
    }
    catch(e){
        console.log(e)
    }
}

main()