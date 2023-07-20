import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    max-width: 360px;
`;

const StyledButton = styled.button`
    border: none;
    background: none;
    padding: 1rem;
    font-size: 1.3rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    opacity: ${({disabled}) => disabled ? "0.5" : "1"};

    &:hover, &:focus { 
        background: none;
        outline: none;
    }
`;

const Buttons = ({time, running, setRunning, setTime, setStart}) => {

    const startTimer = () => {
        setStart(Date.now());
        setRunning(true); 
    };

    function resetTimer() {
        setRunning(false); 
        setTime(0);
        setStart(0);
    }

    return (
        <Wrapper>
            <StyledButton
                onClick={resetTimer}
            >
                Reset
            </StyledButton>
            {running
                ? <StyledButton onClick={() => setRunning(false)}>Pause</StyledButton>
                : <StyledButton onClick={startTimer} disabled={time === 0}>Start</StyledButton>
            }

        </Wrapper >
    )
}

export default Buttons;