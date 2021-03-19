import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "src/hooks/useVisualMode.js"

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  console.log("useVisualMode: ", useVisualMode)
  
  return (  
    <article className="appointment">
      <Header
        time={props.time}
      />
        { props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty /> }
      {/* { props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty /> } */}
    </article>
  );

}

