import { useState } from "react";

// take in an initial mode
// set the mode state with the initial mode provided
// return an object with a mode property

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)

    return { mode };
  }
