const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.region });
const dynamo = new AWS.DynamoDB.DocumentClient({ region: process.env.region });

exports.handler = async function (event) {
  const params = {
    TableName: process.env.dailySongTable,
  };

  const items = await dynamo.scan(params).promise();
  const responseItem = items.Items[0];

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(responseItem),
  };
};
