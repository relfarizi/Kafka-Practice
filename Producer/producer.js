import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:29092'],
});

const topicName = 'order';

const message = (index) => {
  return JSON.stringify({ customerId: 1, orderId: 1, data: 'data ke ' + index });
}
const processProducer = async () => {
  const producer = kafka.producer();
  await producer.connect();
  for (let index = 0; index < 10; index++) {
    // eslint-disable-next-line no-await-in-loop
    await producer.send({
      topic: topicName,
      messages: [{
        value: message(index),
      }],
    });
  }
};
processProducer().then(() => {
  console.log('done');
  process.exit();
});
