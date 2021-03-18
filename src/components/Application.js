import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import DayListItem from "components/DayListItem";
import "components/Application.scss";
import Appointment from "components/Appointment/index"
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "1pm",
  },
  {
    id: 4,
    time: "2pm",
    interview: {
      student: "Ronnie Macdougal",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 5,
    time: "3pm",
    interview: {
      student: "Suge Knight",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    const testURL = `http://localhost:8001/api/days`;
    axios.get(testURL).then(response => {
      setDays([...response.data]);
    });
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        { appointments.map(appointment => 
          <Appointment key={appointment.id} {...appointment} />
        )}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

