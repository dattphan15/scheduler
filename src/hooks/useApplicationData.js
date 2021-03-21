import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  });
  }, [])



  function bookInterview(id, interview) {
    // console.log("ID :", id, "INTERVIEW :", interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // UPDATE SPOTS AVAILABLE WHEN BOOKING INTERVIEW
    const theDays = [...state.days];
    for (let index in theDays) {
      let day = theDays[index]
      console.log("DAY OBJ :", day)
      console.log("DAY OF THE WEEK :", day.id)
      console.log("INTERVIEW ID :", id)
      console.log("INTERVIEW :", interview)
      console.log("STATE :", state)
      if (day.appointments.includes(id)) {
        let updatedDay = { ...day, spots: day.spots - 1}
        console.log("UPDATED DAY: ", updatedDay)
        theDays[index] = updatedDay
      }
    }

    
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({ 
        ...state, 
        appointments, 
        days: theDays 
      });
    }) 

  }


  function cancelInterview(id, interview) {
    console.log("ID :", id, "INTERVIEW :", interview);

    const appointment = {
      ...state.appointments[id], 
      interview: { ...interview } 
    };

    const appointments = { 
      ...state.appointments, 
      [id]: appointment 
    };

    // UPDATE SPOTS AVAILABLE WHEN DELETING INTERVIEW
    const theDays = [...state.days];
    for (let index in theDays) {
      let day = theDays[index]
      if (day.appointments.includes(id)) {
        let updatedDay = { ...day, spots: day.spots + 1}
        theDays[index] = updatedDay
      }
    }

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: theDays });
      })
  }


  return { state, setDay, bookInterview, cancelInterview }

}

    
  
      // // This is the initial state
      // console.log("\n*** Initial State\n", state);
  
      // // This is the initial days state
      // console.log("\n*** Initial Days State\n", state.days);
  
      // // Callthe updateSpots function 
      // const days = updateSpots(state.day, state.days, state.appointments);
      // console.log("\n*** Updated Days\n", days);
  
      // // Hopefully this is unchanged
      // console.log("\n*** Final Days State\n", state.days);