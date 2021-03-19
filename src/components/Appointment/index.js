import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js";
import Form from "components/Appointment/Form.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }


  function cancel() {
    transition(DELETE)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }

  function confirm() {
    transition(CONFIRM)
  }

  
  return (  
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
        />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        />
      )}
      {mode === SAVING && ( <Status message={"Saving"} /> )}
      {mode === DELETE && ( <Status message={"Deleting"} /> )}
      {mode === CONFIRM && ( 
        <Confirm 
        message={"Are you sure you want to delete?"} 
        onConfirm={cancel} 
        onCancel={back}
        /> 
      )}
    </article>
  );

}

