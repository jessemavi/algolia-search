const SearchResults = (props) => {
  return (
    <div>
      {props.hits.map((hit, index) => {
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
