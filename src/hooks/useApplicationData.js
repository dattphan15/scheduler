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

  // Gets spots available for the day
  const getSpotsCount = (dayObj, appointments) => {
    let count = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++;
      }
    }
    return count;
  }

  // Updates spots available for the day after a booking is deleted or added
  const updateSpots = (dayName, days, appointments) => {
    const day = days.find((item) => item.name === dayName);
    const unbooked = getSpotsCount(day, appointments);

    const newArr = days.map(item => {
      if (item.name === dayName) {
        return {...item, spots: unbooked};
      }
      return item;
    });
    return newArr;
  }


  // Adds new booking to database
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spots = updateSpots(state.day, state.days, appointments);

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({ 
        ...state, 
        appointments, 
        days: spots
      });
    }) 

  }


  // Deletes booking from database
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id], 
      interview: null
    };

    const appointments = { 
      ...state.appointments, 
      [id]: appointment 
    };

    const spots = updateSpots(state.day, state.days, appointments);

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments, days: spots });
      })
  }


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
  ])
    .then((all) => {
      setState(prev => ({ 
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      }));
    });
  }, [])


  return { state, setDay, bookInterview, cancelInterview }

}