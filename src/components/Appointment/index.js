import React, { Fragment } from 'react'
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js";
import Form from "components/Appointment/Form.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // const { bookInterview, cancelInterview } = props

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true)); // transition (newMode, replace = true)

  }


  function cancel() {
    transition(DELETING, true)
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  }

  function confirm() {
    transition(CONFIRM)
  }

  function edit() { 
    transition(EDIT)
  }

  
  return (  
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && ( 
        <Empty 
        onAdd={() => transition(CREATE)} 
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && ( 
        <Status 
          message={"Saving"} 
        /> 
      )}
      {mode === ERROR_SAVE && ( 
        <Error 
          message={"Failed to save"} 
          onClose={back} 
        /> 
      )}
      {mode === DELETING && ( 
        <Status 
          message={"Deleting"} 
        /> 
      )}
      {mode === ERROR_DELETE && ( 
        <Error 
          message={"Failed to delete"} 
          onClose={back} 
        /> 
      )}
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

