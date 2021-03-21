import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])
  // console.log("HISTORY",history)
  // console.log("USESTATE", useState)
  
  const transition = function (newMode, replace = false) {
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]); 
      // changes initial history state to history (starting from the beginning, minus the last item in the history array), then adding newMode to the history.
      // old history = [a,b,c], new mode = d
      // new history = [a,b,d]
    } else {
    setHistory(prev => [...prev, newMode]); // changes initial history state to history + newMode
    }
  };

  const back = () => {
    if (history.length < 2) {
      return
    }
    //remove last element of the array
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory)
  }

  //we want the last history of the array
  const mode = history[history.length -1]

return { mode, transition, back };
}