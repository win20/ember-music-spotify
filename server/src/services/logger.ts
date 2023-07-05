import winston from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';

const winstonCloudwatch = new WinstonCloudwatch({
  awsOptions: {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
    },
    region: 'eu-west-2',
  },
  logGroupName: 'ember-music',
  logStreamName: 'first',
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    winstonCloudwatch
  ]
});
