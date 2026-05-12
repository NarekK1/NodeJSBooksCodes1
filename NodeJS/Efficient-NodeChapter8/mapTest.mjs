import test from 'node:test';
import assert from 'node:assert/strict';

//this test checks if the map function correctly doubles each item in the input array
test('doubles items for a 2*e transformer', () => {
    const inputArray = [1, 2, 3, 10];
    const expectedResult = [2, 4, 6, 20];
    
    //using the map function to double each element in the input array
    const actualResult = inputArray.map(e => e * 2);

    //asserting that the actual result from the map function matches the expected result
    assert.deepEqual(actualResult, expectedResult);
});