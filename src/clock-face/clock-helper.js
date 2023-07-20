export const degreesToRadians = (degrees) => degrees * Math.PI / 180;

export const radiansToDegrees = (radians) => radians * (180 / Math.PI);

export const getPointOnCircleByRadius = (r1, r2, radians) => {
    return {
        x: r1 + r2 * Math.cos(radians),
        y: r1 + r2 * Math.sin(radians)
    }
}

export const getRadiusMinusStroke = (radius, stroke) => radius - (stroke * 2);

// Get a point relative to an event on an SVG.
export const getPointOnSVGFromEvent = (svg, e) => {
    let svgPoint = svg.createSVGPoint();
    svgPoint.x = e.clientX;
    svgPoint.y = e.clientY;
    return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
}

// Get angle from 2 points.
export const getAngleFromPoints = (pointA, pointB) => Math.atan2(pointA.y - pointB.y, pointA.x - pointB.x);

// time -> seconds / angle of hours - offset for degree start
export const getDegreesByTime = (time) => ((time / 1000) / 5 * 30) - 90;

// Use radians to determine time on clock.
export const getTimeFromDegrees = (radians) => {
    const miliseconds = Math.floor(1000 * ((radians + 90) / 30 * 5));
    return miliseconds < 0 ? 60000 - Math.abs(miliseconds) : miliseconds;
}

// Determine whether or not a degree is within a given target's range.
export const degreesWithinTargetRange = (degrees, target, range) => ((target - range) < degrees) && (degrees < (target + range)); 
