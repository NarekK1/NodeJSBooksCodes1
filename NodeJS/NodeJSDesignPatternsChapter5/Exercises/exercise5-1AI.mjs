/**
 * Custom implementation of Promise.all()
 * Accepts an iterable of promises and returns a single promise that resolves
 * with an array of results when all promises have resolved, or rejects with
 * the reason of the first promise that rejects.
 */
function PromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resolvedCount = 0;
    const promises = Array.from(iterable);

    // Handle empty iterable
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    // Process each promise
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          resolvedCount++;

          // If all promises resolved, resolve the main promise
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          // Reject immediately on first rejection
          reject(err);
        });
    });
  });
}

// Test cases
async function runTests() {
  console.log('Test 1: All promises resolve');
  try {
    const result = await PromiseAll([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ]);
    console.log('Result:', result); // [1, 2, 3]
  } catch (err) {
    console.error('Error:', err);
  }

  console.log('\nTest 2: Mix of promises and values');
  try {
    const result = await PromiseAll([
      Promise.resolve('a'),
      'b',
      Promise.resolve('c'),
    ]);
    console.log('Result:', result); // ['a', 'b', 'c']
  } catch (err) {
    console.error('Error:', err);
  }

  console.log('\nTest 3: One promise rejects');
  try {
    const result = await PromiseAll([
      Promise.resolve(1),
      Promise.reject(new Error('Promise failed')),
      Promise.resolve(3),
    ]);
    console.log('Result:', result);
  } catch (err) {
    console.error('Error caught:', err.message); // Promise failed
  }

  console.log('\nTest 4: Empty iterable');
  try {
    const result = await PromiseAll([]);
    console.log('Result:', result); // []
  } catch (err) {
    console.error('Error:', err);
  }

  console.log('\nTest 5: Delayed promises');
  try {
    const delay = (ms, value) =>
      new Promise((resolve) => setTimeout(() => resolve(value), ms));
    const result = await PromiseAll([
      delay(100, 'first'),
      delay(50, 'second'),
      delay(150, 'third'),
    ]);
    console.log('Result:', result); // ['first', 'second', 'third']
  } catch (err) {
    console.error('Error:', err);
  }
}

runTests();