import { EventEmitter } from 'node:events';

// createTicker(ms, callback)
// - Returns an EventEmitter that emits 'tick' every 50ms
// - Stops when `ms` milliseconds have passed since invocation
// - Calls `callback(totalTickCount)` when finished
// - Produces an error if the timestamp at the moment of a tick is divisible by 5
// - Propagates the error via both the callback and the event emitter
export function createTicker(ms, callback) {
  if (typeof ms !== 'number' || ms < 0) {
    throw new TypeError('ms must be a non-negative number');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }

  const emitter = new EventEmitter();
  const start = Date.now();
  let count = 0;

  function scheduleTick() {
    setTimeout(() => {
      const elapsed = Date.now() - start;
      const now = Date.now();

      // Check if the current timestamp is divisible by 5
      if (now % 5 === 0) {
        const error = new Error(`Timestamp ${now} is divisible by 5`);
        emitter.emit('error', error);
        callback(error);
        return;
      }

      if (elapsed >= ms) {
        callback(null, count);
        return;
      }

      count += 1;
      emitter.emit('tick');
      scheduleTick(); // Recursively schedule the next tick
    }, 50);
  }

  scheduleTick(); // Start the recursive setTimeout chain

  return emitter;
}

// Demo: run this file directly to see ticks and final count
// Example: node exercises3-2.mjs
if (process.argv[1] && process.argv[1].endsWith('exercises3-2.mjs')) {
  const duration = 530; // milliseconds
  const ticker = createTicker(duration, (total) => {
    console.log(`Done after ~${duration}ms. Total ticks: ${total}`);
  });

  ticker.on('tick', () => {
    console.log('tick');
  });
}