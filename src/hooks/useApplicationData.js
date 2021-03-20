import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })


  function bookInterview(id, interview) {
    console.log("ID :", id, "INTERVIEW :", interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({ 
        ...state, 
        appointments 
      });
    }) 

  }


  function cancelInterview(id, interview) {

    const appointment = {
      ...state.appointments[id], 
      interview: { ...interview } 
    };

    const appointments = { 
      ...state.appointments, 
      [id]: appointment 
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments });
      })
  }

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
  ]).then((all) => {
    // const [days, appointments, interviewers] = all;
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  });
  }, [])

  return { state, setDay, bookInterview, cancelInterview }

}

