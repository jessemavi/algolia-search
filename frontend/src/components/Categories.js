import './Categories.css';

const Categories = (props) => {
  return (
    <div id="categories-list">
      {props.categories.length === 0 ?
        <span>No matches found</span>
      :
        props.categories.map((category) => {
          return (
            <div>
              <button 
                id='category'
                onClick={() => props.onCategorySelection(category[0])}>{category[0]} {category[1]}
              </button>
            </div>
          );
        })
      }
    </div>
  )
};

export default Categories;
