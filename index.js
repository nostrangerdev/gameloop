/**
 * Run a simple gameloop with a simple precalculated delta.
 */
export class GameLoop {
    /* References for the timeloop */
    #previousTimestamp;
    #rafRequest;

    /* User implemented callbacks */
    #updateCallback;
    #renderCallback;

    /**
     * @constructor
     * @param {object} callbacks - Used to define your game logic
     * @param {function(number): void|undefined} callbacks.update - Where you handle input and update your game state
     * @param {function(): void|undefined} callbacks.render - Where you draw on the screen or sync your visual representation
     */
    constructor({ update, render } = {}) {
        this.#updateCallback = update || (() => null); // Fallback
        this.#renderCallback = render || (() => null); // Fallback
    }

    /**
     * Code called on each frame, it calculate a timedelta and
     * passes it to the "update" callback.
     *
     * @param {number} timestamp - The performance.now value
     * @internal
     */
    #tick = timestamp => {
        this.#rafRequest = requestAnimationFrame(this.#tick);

        const delta = (timestamp - this.#previousTimestamp) / 1000;

        this.#updateCallback(delta);
        this.#renderCallback();

        this.#previousTimestamp = timestamp;
    };

    /**
     * Get the game loop state.
     *
     * @returns {bool} The game loop state
     */
    get isActive() {
        return this.#rafRequest !== null;
    }

    /**
     * Start the gameloop.
     */
    start() {
        if (this.active) return;

        this.#previousTimestamp = performance.now();
        this.#rafRequest = requestAnimationFrame(this.#tick);
    }

    /**
     * Stop the gameloop.
     */
    stop() {
        cancelAnimationFrame(this.#rafRequest);
        this.#rafRequest = null;
    }
}
