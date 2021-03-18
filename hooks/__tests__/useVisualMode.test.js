import { renderHook, act } from "@testing-library/react-hooks"

import useVisualMode from "/home/kevin/lighthouse/w7-react/scheduler/hooks/useVisualMode.js";

const FIRST = "FIRST";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  expect(result.current.mode).toBe(FIRST);
});