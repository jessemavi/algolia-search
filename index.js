const express = require('express');
const app = express();
const api_keys = require('./api_keys');
const algoliasearch = require('algoliasearch');
// move ADMIN API Key to separate file
const client = algoliasearch('0Z8CJDE7SH', api_keys.keys.algolia_search);
const index = client.initIndex('appstore_search');

app.get('/', (req, res) => {
  res.send('main route');
});

// Add an app (as a JSON object) to the Algolia apps index and return its id
app.post('/api/1/apps', (req, res) => {

});

// Delete an app from the Algolia index
app.delete('/api/1/apps/:id', (req, res) => {

});

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
