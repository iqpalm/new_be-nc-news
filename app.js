const express = require('express');
const { allTopics } = require('./controllers/controller');

const app = express();

app.get('/api/topics', allTopics);

app.all('/*', (req, res) => {
  res.status(404).send({ error: 'invalid path' });
});

module.exports = app;
