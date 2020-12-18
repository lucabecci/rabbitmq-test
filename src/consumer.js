const amqp = require('amqplib')


async function main(){

    const queue = 'employees'
    const slack = 'Slack'
    const google = 'Google'

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
            let employee = JSON.parse(message.content.toString())
            console.log(`Received employee  ${employee.name}`)
            console.log(employee)

            if(employee.enterprise == slack || employee.enterprise == google){
                channel.ack(message)
                console.log('Deleted message from queue...\n')
            }else{
                console.log('This message is not for me, I will not delete this...\n')
            }
        })

    }
    catch(e){
        console.log(e)
    }
}

main()