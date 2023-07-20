import React from "react";
import {degreesToRadians, getPointOnCircleByRadius, getRadiusMinusStroke} from "./clock-helper";

const ClockCountdown = ({radius, stroke, degree}) => {

    // Stroke is filled from the center radius line.
    const radiusMinusStroke = getRadiusMinusStroke(radius, stroke);

    // Convert the degrees to radians
    const radians = degreesToRadians(degree);

    // Calculate the point on the circle for the countdown.
    const outer = getPointOnCircleByRadius(radius, radiusMinusStroke, radians);

    // If there is a large arc, we need to change keep the arc in the right direction.
    const largeArc = 90 <= degree ? "1" : "0";

    // If our degrees are 270, use a circle instead of arc.
    if (degree === 270) {
        return (
            <circle
                stroke="white"
                fill="transparent"
                stroke-width={stroke}
                strokeWidth={stroke}
                r={radiusMinusStroke}
                cx={radius}
                cy={radius}
            />
        )
    }

    return (
            <path d={`M ${radius} ${stroke * 2}
                      A ${radiusMinusStroke} ${radiusMinusStroke} 0 ${largeArc} 1 ${outer.x} ${outer.y}`}
                stroke="white"
                stroke-width={stroke}
                strokeWidth={stroke}
                fill="transparent"
            />
    );
}

export default ClockCountdown;
