import { version, Component } from 'inferno';
import '../registerServiceWorker';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import keys from '../api_keys';

const client = algoliasearch('0Z8CJDE7SH', keys.algolia_search);
const helper = algoliasearchHelper(client, 'appstore_search');

class App extends Component {
  constructor() {
    super();
    this.state = {
      hits: []
    };

    helper.on('result', async (content) => {
      await this.setState({
        hits: content.hits
      });
      console.log(this.state);
    });

    helper.search();
  }

  render() {
    return (
      <div className="App">
        <h2>Algolia App</h2>
      </div>
    );
  }
}

export default App;



// components:
  // main app: keeps track of state and makes requests to algolia, passes results to apps list(functional stateless) and app categories to categories
    // search box: passes search input to app
    // list of apps found (hits) with a way to sort the results by rank ASC or rank DESC (default)
    // categories filtering (faceting)
