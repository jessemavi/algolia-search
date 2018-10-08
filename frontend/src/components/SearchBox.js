import { Component } from 'inferno';

class SearchBox extends Component {
  constructor(props) {
    super();
    this.state = {
      searchQuery: ''
    };
  }

  onSearchInputChange = (event) => {
    this.setState({
      searchQuery: event.target.value
    });

    this.props.algoliaSearch(event.target.value);
  }

  render() {
    return (
      <div>
        <input
          value={this.state.searchQuery}
          onInput={this.onSearchInputChange}
        />
      </div>
    )
  }
};

export default SearchBox;
