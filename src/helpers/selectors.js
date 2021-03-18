export default function getAppointmentsForDay(state, day){
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

export function selectUserByName(state, name) {
  const filteredNames = state.users.filter(user => user.name === name);
  return filteredNames;
}

