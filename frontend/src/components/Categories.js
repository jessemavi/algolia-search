import './Categories.css';

const Categories = (props) => {
  return (
    <div id="categories-list">
      {props.categories.length === 0 ?
        <span>No matches found</span>
      :
        <span id="category-header">Categories</span>
      }

      {props.categories.length > 0 ?
        props.categories.map((category) => {
          return (
            <div>
              <span 
                id='category'
                onClick={() => props.onCategorySelection(category[0])}>{category[0]} {category[1]}
              </span>
            </div>
          );
        })
      :
        null
      }
    </div>
  )
};

export default Categories;
