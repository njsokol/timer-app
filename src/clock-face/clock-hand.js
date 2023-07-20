import React, {Fragment} from "react";
import {degreesToRadians, getPointOnCircleByRadius, getRadiusMinusStroke} from "./clock-helper";

const ClockHand = ({radius, stroke, degree}) => {

    const getHandWidth = (stroke) => stroke / 2;

    // Stroke is filled from the center radius line.
    const radiusMinusStroke = getRadiusMinusStroke(radius, stroke);

    // Convert to radians
    const radians = degreesToRadians(degree);

    // Determine the point on the radius for the circle part of the hand.
    const outer = getPointOnCircleByRadius(radius, radiusMinusStroke, radians);

    // Determine the hand width.
    const handWidth = getHandWidth(stroke);

    return (
        <Fragment>
            <line
                key={`ticker-${degree}`}
                x1={radius}
                y1={radius}
                x2={outer.x}
                y2={outer.y}
                stroke="#FFD600"
                strokeWidth={handWidth}
            />
            <circle
                fill="#FFD600"
                r={stroke * 1.2}
                cx={outer.x}
                cy={outer.y}
            />
        </Fragment>
    );
}

export default ClockHand;
