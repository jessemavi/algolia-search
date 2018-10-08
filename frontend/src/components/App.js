import { Component } from 'inferno';
import '../registerServiceWorker';
import SearchBox from './SearchBox';
import Categories from './Categories';
import SearchResults from './SearchResults';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import keys from '../api_keys';

const client = algoliasearch('0Z8CJDE7SH', keys.algolia_search);
const index = client.initIndex('appstore_search');

index.setSettings({
  attributesForFaceting: ['category']
});

const helper = algoliasearchHelper(client, 'appstore_search', {
  facets: ['category']
});


class App extends Component {
  constructor() {
    super();
    this.state = {
      hits: [],
      categories: [],
      sortOrder: 'Descending'
    };
  }

  componentDidMount = () => {
    helper.on('result', async (content) => {
      const categories = [];

      if(content.facets[0] !== undefined) {
        const searchResultCategories = content.facets[0].data;
        for(let key in searchResultCategories) {
          categories.push([key, searchResultCategories[key]]);
        }
      }

      await this.setState({
        hits: content.hits,
        categories: categories
      });
    });

    helper.search();
  }

  algoliaSearch = (query) => {
    helper.setQuery(query).search();

    helper.on('result', async (content) => {
      await this.setState({
        hits: content.hits
      });

      if(this.state.sortOrder === 'Descending') {
        await this.onSortDescending();
      } else if(this.state.sortOrder === 'Ascending') {
        await this.onSortAscending();
      }
    });
  }

  onCategorySelection = (category) => {
    helper.toggleFacetRefinement('category', category).search();
  };

  onSortDescending = () => {
    let { hits } = this.state;

    hits = hits.sort((a, b) => {
      return b.rank - a.rank;
    });

    this.setState({
      hits: hits,
      sortOrder: 'Descending'
    })
  };

  onSortAscending = () => {
    let { hits } = this.state;

    hits = hits.sort((a, b) => {
      return a.rank - b.rank;
    });

    this.setState({
      hits: hits,
      sortOrder: 'Ascending'
    })
  };

  render() {
    return (
      <div className="App">
        <h2>Algolia App</h2>
        <SearchBox algoliaSearch={this.algoliaSearch} />
        <Categories 
          categories={this.state.categories} 
          onCategorySelection={this.onCategorySelection}
        />
        <SearchResults 
          hits={this.state.hits} 
          sortOrder={this.state.sortOrder}
          onSortDescending={this.onSortDescending}
          onSortAscending={this.onSortAscending}
        />
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
