import { Component } from 'inferno';
import '../registerServiceWorker';
import SearchBox from './SearchBox';
import Categories from './Categories';
import SearchResults from './SearchResults';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';

const client = algoliasearch('0Z8CJDE7SH', '8ca2fa4117eb72a291f437babb8e5a11');
const index = client.initIndex('appstore_search');

index.setSettings({
  attributesForFaceting: ['category'],
  hitsPerPage: 85
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
    helper.search();

    helper.on('result', async (content) => {
      console.log('content', content);

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

      if(this.state.sortOrder === 'Descending') {
        this.onSortDescending();
      } else if(this.state.sortOrder === 'Ascending') {
        this.onSortAscending();
      }
    });
  }


  algoliaSearch = (query) => {
    helper.setQuery(query).search();

    helper.on('result', async (content) => {
      console.log('content from algoliaSearch', content);
      await this.setState({
        hits: content.hits
      });

      console.log('state order', this.state.sortOrder);

      if(this.state.sortOrder === 'Descending') {
        await this.onSortDescending();
      } else if(this.state.sortOrder === 'Ascending') {
        await this.onSortAscending();
      }
    });
  }


  onCategorySelection = (category) => {
    helper.toggleFacetRefinement('category', category).search();
  }


  onSortDescending = () => {
    let { hits } = this.state;

    hits = hits.sort((a, b) => {
      return b.rank - a.rank;
    });

    this.setState({
      hits: hits,
      sortOrder: 'Descending'
    })
  }


  onSortAscending = () => {
    let { hits } = this.state;

    hits = hits.sort((a, b) => {
      return a.rank - b.rank;
    });

    this.setState({
      hits: hits,
      sortOrder: 'Ascending'
    })
  }


  render() {
    return (
      <div className="App">
        <h2>Appstore Search</h2>
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
