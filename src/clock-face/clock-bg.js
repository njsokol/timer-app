import React, {Fragment} from "react";
import {degreesToRadians, getPointOnCircleByRadius, getRadiusMinusStroke} from "./clock-helper.js";

const ClockBg = ({radius, stroke}) => {

    const getTickerWidth = (stroke) => stroke / 2;

    // Because we use a stroke, our radius is less.
    const radiusMinusStroke = getRadiusMinusStroke(radius, stroke);

    // Inner circle created for the hour marks.
    const tickerCircleRadius = getRadiusMinusStroke(radiusMinusStroke, stroke);

    // Get ticker width.
    const tickerWidth = getTickerWidth(stroke);

    const degrees = [];
    for (let i = 0; i <= 12; i++) {
        const degree = i * 30;
        degrees.push(degree);
    }

    return (
        <Fragment>
            {degrees.map(degree => {

                // First get radians
                const radians = degreesToRadians(degree);

                // Now get our inner and outer points to draw our ticker.
                const inner = getPointOnCircleByRadius(radius, tickerCircleRadius, radians);
                const outer = getPointOnCircleByRadius(radius, radiusMinusStroke, radians);

                return (
                    <line
                        key={`ticker-${degree}`}
                        x1={inner.x}
                        y1={inner.y}
                        x2={outer.x}
                        y2={outer.y}
                        stroke="#000"
                        strokeWidth={tickerWidth}
                    />
                );
            })}
            <svg
                className="shadow"
            >
                <circle
                    stroke="#000"
                    fill="transparent"
                    stroke-width={stroke}
                    strokeWidth={stroke}
                    r={radiusMinusStroke}
                    cx={radius}
                    cy={radius}
                />
            </svg>

        </Fragment>
    );
}

export default ClockBg;
