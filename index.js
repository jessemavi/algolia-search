const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const api_keys = require('./api_keys');
const algoliasearch = require('algoliasearch');
const client = algoliasearch('0Z8CJDE7SH', api_keys.algolia_search);
const index = client.initIndex('appstore_search');

app.use(bodyParser.json());

// Add an app (as a JSON object) to the Algolia apps index and return its id
app.post('/api/1/apps', (req, res) => {
  const app = {
    name: req.body.name,
    image: req.body.image,
    link: req.body.link,
    category: req.body.category,
    rank: req.body.rank
  };

  const add_app_to_index = async () => {
    try {
      const added_app = await index.addObject(app);
      res.send(added_app.objectID);
    } catch(err) {
      res.send(err);
    }
  };

  add_app_to_index();
});

// Delete an app from the Algolia index
app.delete('/api/1/apps/:id', (req, res) => {
  const delete_app = async () => {
    try {
      const deleted_app = await index.deleteObject(req.params.id);
      res.send(deleted_app);
    } catch(err) {
      res.send(err);
    }
  };

  delete_app();
});

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
