import './Categories.css';

const Categories = (props) => {
  return (
    <div id="categories-list">
      {props.categories.map((category) => {
        return (
          <div>
            <span onClick={() => props.onCategorySelection(category[0])}>{category[0]} {category[1]}</span>
          </div>
        );
      })}
    </div>
  )
};

export default Categories;
