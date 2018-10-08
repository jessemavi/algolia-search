const Categories = (props) => {
  // console.log(props);
  return (
    <div>
      {props.categories.map((category, index) => {
        return (
          <p id={index}>{category[0]} {category[1]}</p>
        );
      })}
    </div>
  )
};

export default Categories;
