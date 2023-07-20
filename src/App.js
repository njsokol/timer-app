import React, {useEffect, useState} from "react";
import "./App.css";
import ClockFace from "./clock-face/clock-face";
import NumberDisplay from "./number-display/number-display";
import Buttons from "./buttons/buttons";
import Login from "./login/login";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {

  const [pass, setPass] = useState("");
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(0);
  const [running, setRunning] = useState(false);

  const REFRESH_RATE = 40;

  // Used for running the Timer
  useEffect(() => {
    let interval = null;
    if (time <= 0) {
      setTime(0);
      setStart(0);
      setRunning(false);
      clearInterval(interval);
    }
    else if (running) {
      interval = setInterval(() => {
        const current = Date.now();
        const delta = current - start; // Time that has passed
        setTime(time - delta);
        setStart(current);
      }, REFRESH_RATE);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, time, start, REFRESH_RATE]);

  // Password protect the app.
  if (pass !== "Boulder") return <Login pass={pass} setPass={setPass} />;

  return (
    <Wrapper>
      <ClockFace time={time} running={running} setTime={setTime} />
      <NumberDisplay time={time} running={running} setTime={setTime} />
      <Buttons time={time} running={running} setRunning={setRunning} setTime={setTime} setStart={setStart} />
    </Wrapper>
  )
}

export default App;
