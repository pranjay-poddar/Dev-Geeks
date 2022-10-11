export class Layer {
    constructor(strategy) {
        this.strategy = strategy
    }

    /***
     *
     * Replaces current layer with a new layer with background color
     *
     * @param height - Layer Height
     * @param width - Layer Width
     * @param backgroundColor - Layer background color
     * @returns {Promise<void>}
     */
    async newLayer(height, width, backgroundColor) {
        await this.strategy.newLayer(height, width, backgroundColor);
    }

    /***
     *
     * Replaces current layer with image from file
     *
     * @param filename
     * @returns {Promise<void>}
     */
    async fromFile(filename) {
        await this.strategy.fromFile(filename)
    }

    /***
     *
     * write contents of current layer to file
     *
     * @param filename
     * @returns {Promise<void>}
     */
    async toFile(filename) {
        await this.strategy.toFile(filename)
    }

    /***
     *
     * replaces current layer with a composite of input layer over current layer
     *
     * @param layer
     * @returns {Promise<void>}
     */

    async compositeLayerOver(layer) {
        await this.strategy.compositeLayerOver(layer)
    }

    /***
     *
     * Blurs current layer
     *
     * @param byPixels
     * @returns {Promise<void>}
     */
    async blur(byPixels) {
        await this.strategy.blur(byPixels)
    }

    /***
     *
     * changes current the opacity of the current layer
     *
     * @param opacity
     * @returns {Promise<void>}
     */
    async adjustLayerOpacity(opacity) {
        await this.strategy.adjustLayerOpacity(opacity)
    }

    /***
     *
     * Rotates current layer
     *
     * @param angle
     * @returns {Promise<void>}
     */
    async rotate(angle) {
        await this.strategy.rotate(angle);
    }


    /****
     *
     * Resizes current layer
     *
     * @param height
     * @param width
     * @returns {Promise<void>}
     */
    async resize(height, width) {
        await this.strategy.resize(height, width);
    }
}