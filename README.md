# GameLoop

A super simple implementation of a game loop

## Usage

```js
import { GameLoop } from '@nostranger/gameloop';

const gameLoop = new GameLoop({
  update(delta) {
    // Update data here
  },
  render() {
    // Draw graphics here
  },
});

// Start the game loop
gameLoop.start();

// Stop the game loop
gameLoop.stop();

// Check if the game loop is running
gameLoop.isActive; // bool
```
