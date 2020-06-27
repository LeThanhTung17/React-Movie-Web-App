import React from "react";
import "./FourColGrid.css";

const FourColGrid = (props) => {
  console.log(props.children);
  const renderElement = () => {
    const gridElement = props.children
      ? props.children.map((el, i) => {
          return (
            <div key={i} className="rmdb-grid-element">
              {el}
            </div>
          );
        })
      : null;
    return gridElement;
  };

  return (
    <div className="rmdb-grid">
      {props.header && props.loading ? <h1>{props.header}</h1> : null}
      <div className="rmdb-grid-content">{renderElement()}</div>
    </div>
  );
};

export default FourColGrid;
