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
      <select value={props.sortOrder} onChange={handleChange.bind(this)}>
        <option value="Descending">Descending</option>
        <option value="Ascending">Ascending</option>
      </select>

      {props.hits.map((hit) => {
        return (
          <div>
            <p>{hit.name}</p>
            <p>{hit.category}</p>
            <p>{hit.rank}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
