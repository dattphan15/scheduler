import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])
  
  const transition = function (newMode, replace = false) {
    if (replace) {
      setHistory([...history.slice(0, -1), newMode]); 
      // changes initial history state to history (starting from the beginning, minus the last item in the history array), then adding newMode to the history.
      // old history = [a,b,c], new mode = d
      // new history = [a,b,d]
    } else {
    setHistory([...history, newMode]); // changes initial history state to history + newMode
    }
  };

  const back = function () {
    if (history.length < 2) { // prevents user from going back past the initial mode
      return
    }
    const newHistory = [...history];
    setHistory([...history.slice(0, -1)]); // sets history as initial history minus the last mode
  }

  const mode = history[history.length - 1]
  
  return { mode, transition, back };
}