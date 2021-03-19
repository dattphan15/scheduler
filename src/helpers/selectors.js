export function getAppointmentsForDay(state, day){
  //Once we have access to the appointment array for the given day, we'll need to iterate through it, comparing where it's id matches the id of states.appointments and return that value.

  const appointmentDay = state.days.find(currentDay => { return currentDay.name === day} )
  if (!appointmentDay) {
    return []
  }
  const ids = appointmentDay.appointments
  return ids.map(id => state.appointments [id])
}

// export function getAppointmentsForDay(state, day) {
//   const filteredDays = state.days.filter(elem => elem.name === day); // name: Monday

//   if (filteredDays.length < 1) { // if Monday isn't found
//     return [];
//   }

//   return filteredDays[0].appointments.map(id => state.appointments[id]) // return 
// }

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

// export function getInterview(state, interview) {

//   // Check if interview matches the state.appointments > interview
//   // console.log("state.appointments :", state.appointments)
//   // console.log("interview.interviewer :", interview.interviewer)

//   const intArr = []
  
//   for (const key in state.appointments) {
//     // console.log("key :", state.appointments[key].interview)
//     if (state.appointments[key].interview === null) {
//       console.log("First test!");
//     }
//     if (state.appointments[key].interview === interview) {
//       console.log("They match!");
//       intArr.push(interview)
//     }
//     console.log("intArr :", intArr)
//   }

// }


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
  return ids.map(id => state.interviewers [id])
}



// This function will log the values that we pass to it for now. In the future it will allow us to change the local state when we book an interview. The next logical step is to ensure that the child can call the action with the correct data.
export function bookInterview(id, interview) {
  console.log(id, interview);
}



export function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };

  // props.bookInterview(appointment.id, interview)
}