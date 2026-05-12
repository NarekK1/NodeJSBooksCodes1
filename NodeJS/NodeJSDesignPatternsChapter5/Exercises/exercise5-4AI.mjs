async function mapAsync(iterable, callback, concurrency) {
  const items = [...iterable];
  const results = [];
  const executing = [];
  let index = 0;

  // Process all items
  for (const [i, item] of items.entries()) {
    // Create promise for this item
    const promise = Promise.resolve().then(() => callback(item, i, items));
    
    // Store result at the correct index to maintain order
    results[i] = promise;

    // If concurrency limit is set, manage the executing queue
    if (concurrency <= items.length) {
      // Add to executing queue
      const executing_promise = promise.then(() => {
        executing.splice(executing.indexOf(executing_promise), 1);
      });
      executing.push(executing_promise);

      // Wait if we've reached the concurrency limit
      if (executing.length >= concurrency) {
        await Promise.race(executing);
      }
    }
  }

  // Wait for all promises to complete and return resolved results
  return Promise.all(results);
}

// Example usage
async function testMapAsync() {
  console.log('Test 1: Simple array with delays');
  const result1 = await mapAsync(
    [1, 2, 3, 4, 5],
    async (num) => {
      await new Promise(resolve => setTimeout(resolve, 100 * num));
      console.log(`Processed: ${num}`);
      return num * 2;
    },
    2 // Only 2 items processed concurrently
  );
  console.log('Result 1:', result1);

  console.log('\nTest 2: Mixed sync and async callbacks');
  const result2 = await mapAsync(
    ['a', 'b', 'c', 'd'],
    (item, index) => {
      if (index % 2 === 0) {
        return item.toUpperCase(); // Sync value
      }
      return Promise.resolve(item.toUpperCase()); // Async value
    },
    3
  );
  console.log('Result 2:', result2);

  console.log('\nTest 3: With URLs simulation');
  const urls = ['url1', 'url2', 'url3', 'url4', 'url5'];
  const result3 = await mapAsync(
    urls,
    async (url, index) => {
      const delay = Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      console.log(`Fetched: ${url} (${index})`);
      return { url, data: `Data from ${url}` };
    },
    2
  );
  console.log('Result 3:', result3);
}

testMapAsync().catch(console.error);