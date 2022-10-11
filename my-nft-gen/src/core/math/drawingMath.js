//I probably stole this from stack overflow long ago
export const findPointByAngleAndCircle = (pos, angle, radius) => {
    let x = pos.x + radius * Math.cos(degreesToRadians(angle));
    let y = pos.y + radius * Math.sin(degreesToRadians(angle));
    return {x: x, y: y};
}

//See comment on method above
export const degreesToRadians = (degrees) => {
    let pi = Math.PI;
    return degrees * (pi / 180);
}