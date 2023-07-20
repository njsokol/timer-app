import React, {useState} from "react";
import ClockBg from "./clock-bg";
import ClockHand from "./clock-hand";
import ClockCountdown from "./clock-countdown";
import {radiansToDegrees, getPointOnSVGFromEvent, getAngleFromPoints, getDegreesByTime, getTimeFromDegrees, degreesWithinTargetRange} from "./clock-helper";

const ClockFace = ({time, running, setTime}) => {

    const [mouseDown, setMouseDown] = useState(false);
    const [lastDegree, setLastDegree] = useState(0);

    const radius = 160;

    const stroke = 16;

    const degree = getDegreesByTime(time);

    let SVG;

    function updateTime(ev) {
        // Don't change the time if we are currently running
        if (running) return;

        // Get the event coordinates.
        const eventPointOnSvg = getPointOnSVGFromEvent(SVG, ev);

        // Determine the angle from the event to the center of the clock.
        const angle = getAngleFromPoints(eventPointOnSvg, {x: radius, y: radius});

        // Get radians of the angle
        const degrees = radiansToDegrees(angle);
        
        // If we are trying to set the clock to 60 seconds, make it easier.
        if (degreesWithinTargetRange(lastDegree, -90, 4) && degreesWithinTargetRange(degrees, -90, 4)) {
            setLastDegree(degrees);
            return setTime(60000);
        }

        // Calculate a new time.
        const newTime = getTimeFromDegrees(degrees);

        setTime(newTime);
        setLastDegree(degrees);
    }

    // Touch events are different then mouse events.
    function handleTouchMove(ev) {
        ev.preventDefault();
        const touch = ev.touches[0];
        updateTime(touch);
    }

    return (
        <svg
            ref={(svg) => SVG = svg}
            onMouseDown={(ev) => {setMouseDown(true); updateTime(ev);}}
            onMouseUp={() => setMouseDown(false)}
            onMouseLeave={() => setMouseDown(false)}
            onMouseMove={(ev) => {if (mouseDown) updateTime(ev);}}
            onTouchMove={handleTouchMove}
            height={radius * 2}
            width={radius * 2}
            className="shadow"
        >
            <ClockBg
                radius={radius}
                stroke={stroke}
            />
            <ClockCountdown
                radius={radius}
                stroke={stroke}
                degree={degree}
            />
            <ClockHand
                radius={radius}
                stroke={stroke}
                degree={degree}
            />
        </svg>
    );
}

export default ClockFace;
