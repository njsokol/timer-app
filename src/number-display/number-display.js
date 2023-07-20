import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    padding: 0.25rem;
    background: none;
    border: none;
    color: #fff;
    font-size: 4rem;
    font-family: 'Roboto Mono', monospace;
    display: block;
    margin: 0;

    &:focus {
        outline: none;
    }

    /* Our input only needs to be 2 characters wide. */
    width: 2ch;
    
    /* Remove the scroll icons. */
    &::-webkit-inner-spin-button, 
    &::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 0 2rem;
`;

const Colon = styled.div`
    color: #fff;
    font-size: 4rem;
    padding-top: 0.1rem;
`;

const NumberDisplay = ({time, setTime, running}) => {

    // Do some math to get the seconds and miliseconds
    const seconds = secondsInTime(time);
    const miliseconds = milisecondsLeftInTime(time, seconds);

    // Format the seconds and miliseconds to the `00` format.
    const secondTime = formatDisplayTime(seconds);
    const miliTime = formatDisplayTime(miliseconds);

    function handleSecondInput(ev) {
        let {value} = ev.target;
        value = Number(value);

        // We don't want to show anything over 60 seocnds.
        if (value > 60) value = 60;

        // Zero out the miliseconds if value is 60.
        const newTime = value === 60
            ? value * 1000
            : value * 1000 + miliseconds

        setTime(newTime);
    }

    function handleMiliInput(ev) {
        let {value} = ev.target;
        value = Number(value);

        // 99 is the max.
        if (value > 99) return;

        // Update the milisecond value if we are below 60 seconds.
        const newTime = seconds !== 60
            ? seconds * 1000 + value
            : seconds * 1000;

        setTime(newTime);
    }

    return (
        <Container>
            <StyledInput
                min="0"
                max="60"
                type="number"
                inputmode="decimal"
                value={secondTime}
                onChange={handleSecondInput}
                disabled={running}
            />
            <Colon>:</Colon>
            <StyledInput
                min="0"
                max="99"
                type="number"
                inputmode="decimal"
                value={miliTime}
                onChange={handleMiliInput}
                disabled={running}
            />
        </Container>
    )
}

export default NumberDisplay;

// We always want the time to show `00` format.
function formatDisplayTime(number) {return (number < 10 ? "0" + number : number + "").slice(0, 2)};

// How many seconds are in a time
function secondsInTime(time) {return Math.floor(time / 1000)};

// How many miliseconds are in a time
function milisecondsLeftInTime(time, seconds) {return time - (seconds * 1000)};
