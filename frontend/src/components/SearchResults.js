import './SearchResults.css';

const SearchResults = (props) => {
  const handleChange = (event) => {
    const selectedOrder = event.target.value;

    if(selectedOrder === 'Descending') {
      props.onSortDescending();
    } else if(selectedOrder === 'Ascending') {
      props.onSortAscending();
    }
  }

  return (
    <div id="search-results">

      {props.hits.length > 0 ?
        <select id="sort-selection" value={props.sortOrder} onChange={handleChange.bind(this)}>
          <option value="Descending">Descending</option>
          <option value="Ascending">Ascending</option>
        </select>
      :
        null
      }

      {props.hits.map((hit) => {
        return (
          <div class="search-hit">
            <p id="app-name">{hit.name}</p>
            <p>Category: {hit.category}</p>
            <p>Rank: {hit.rank}</p>
            <button onClick={() => window.location.href=`${hit.link}`}>View on Appstore</button>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
