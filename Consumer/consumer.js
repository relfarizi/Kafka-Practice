import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'],
});


const consumerNumber = process.argv[2] || '1';

const logMessage = (counter, consumerName, topic, partition, message) => {
  console.log(`received a new message number: ${counter} on ${consumerName} : `, {
    topic,
    partition,
    message: {
      offset: message.offset,
      headers: message.headers,
      value: JSON.parse(message.value.toString()),
    },
  });
};

const processConsumer = async (groupId, topicName) => {
  const orderConsumer = kafka.consumer({ groupId });
  await orderConsumer.connect();
  await orderConsumer.subscribe({ topic: topicName });
  let orderCounter = 1;
  await orderConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      logMessage(orderCounter, `ordersConsumer#${consumerNumber}`, topic, partition, message);
      orderCounter++;
    },
  });
};

export default processConsumer;
