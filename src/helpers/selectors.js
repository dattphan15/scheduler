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


/*

state : { days:
  [ { id: 1, name: 'Monday', appointments: [Array] },
    { id: 2, name: 'Tuesday', appointments: [Array] } ],
 appointments:
  { '1': { id: 1, time: '12pm', interview: null },
    '2': { id: 2, time: '1pm', interview: null },
    '3': { id: 3, time: '2pm', interview: [Object] },
    '4': { id: 4, time: '3pm', interview: null },
    '5': { id: 5, time: '4pm', interview: [Object] } },
 interviewers:
  { '1':
     { id: 1,
       name: 'Sylvia Palmer',
       avatar: 'https://i.imgur.com/LpaY82x.png' },
    '2':
     { id: 2,
       name: 'Tori Malcolm',
       avatar: 'https://i.imgur.com/Nmx0Qxo.png' } } }

interview : { student: 'Archie Cohen', interviewer: 2 }

*/