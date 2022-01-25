import { Kafka } from 'kafkajs';

const createTopic = (topicName) => {
  const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092'],
  });

  const process = async () => {
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
      topics: [
        {
          topic: topicName,
          numPartitions: 2,
          replicationFactor: 1
        },
      ],
    });
    await admin.disconnect();
  };

  // eslint-disable-next-line no-console
  process().then(() => console.log('done'));
};

export default createTopic;
