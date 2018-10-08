const Categories = (props) => {
  // console.log(props);
  return (
    <div>
      {props.categories.map((category) => {
        return (
          <div>
            <p onClick={() => props.onCategorySelection(category[0])}>{category[0]}</p>
            <p>{category[1]}</p>
          </div>
        );
      })}
    </div>
  )
};

export default Categories;
