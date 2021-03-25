export function getAppointmentsForDay(state, day){
  //Once we have access to the appointment array for the given day, we'll need to iterate through it, comparing where it's id matches the id of states.appointments and return that value.

  const appointmentDay = state.days.find(currentDay => { return currentDay.name === day} )
  if (!appointmentDay) {
    return []
  }
  const ids = appointmentDay.appointments
  return ids.map(id => state.appointments[id])
}


export const getInterview = (state, interview) => {
  let newObj = {}
  
  if (!interview) {
    return null
  } else {
    for (const key in state.interviewers) {
      if (state.interviewers[key].id === interview.interviewer) {
        const student = interview.student
        newObj = {
          student, 
          interviewer: {
            ...state.interviewers[key]
          }
        }
      }
    }
  }
  return newObj
}



export function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
}

export function getInterviewersForDay(state, day){
  //Once we have access to the appointment array for the given day, we'll need to iterate through it, comparing where it's id matches the id of states.appointments and return that value.

  const appointmentDay = state.days.find(currentDay => { return currentDay.name === day} )
  if (!appointmentDay) {
    return []
  }
  const ids = appointmentDay.interviewers
  return ids.map(id => state.interviewers[id])
}