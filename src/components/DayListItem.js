import React from "react";
const classNames = require('classnames');

export default function DayListItem(props) {
//   const listItemClass = classNames("listItem", {
//     " listItem--name": props.name,
//     " listItem--spots": props.spots,
//     " listItem--selected": props.selected
//  });

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}