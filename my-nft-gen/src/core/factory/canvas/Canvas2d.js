export class Canvas2d {
    constructor(strategy) {
        this.strategy = strategy
    }

    /***
     *
     * replaces current canvas with new canvas
     *
     * @param width
     * @param height
     * @returns {Promise<void>}
     */
    async newCanvas(width, height) {
        await this.strategy.newCanvas(width, height);
    }

    /***
     *
     * replaces current canvas with image from file
     *
     * @param filename
     * @returns {Promise<void>}
     */
    async toFile(filename) {
        await this.strategy.toFile(filename);
    }

    async drawRing2d(pos, radius, innerStroke, innerColor, outerStroke, outerColor) {
        await this.strategy.drawRing2d(pos, radius, innerStroke, innerColor, outerStroke, outerColor);
    }

    async drawRay2d(pos, stroke, color, innerColor, angle, radius, length) {
        await this.strategy.drawRay2d(pos, stroke, color, innerColor, angle, radius, length);
    }

    async drawRays2d(pos, radius, length, sparsityFactor, innerStroke, innerColor, outerStroke, outerColor) {
        await this.strategy.drawRays2d(pos, radius, length, sparsityFactor, innerStroke, innerColor, outerStroke, outerColor);
    }

    async drawPolygon2d(radius, pos, numberOfSides, startAngle, innerStroke, innerColor, outerStroke, outerColor) {
        await this.strategy.drawPolygon2d(radius, pos, numberOfSides, startAngle, innerStroke, innerColor, outerStroke, outerColor);
    }

    async drawGradientLine2d(startPos, endPos, stroke, startColor, endColor) {
        await this.strategy.drawGradientLine2d(startPos, endPos, stroke, startColor, endColor);
    }

    async drawFilledPolygon2d(radius, pos, numberOfSides, startAngle, fillColor, alpha) {
        await this.strategy.drawFilledPolygon2d(radius, pos, numberOfSides, startAngle, fillColor, alpha);
    }
}
