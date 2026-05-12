import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

//checking the map method on arrays
describe('The map method on arrays', () => {
    //testing the map method with a simple transformer that doubles the items in the array
    it('doubles items for a 2*e transformer', () => {
        //input array and expected result for the test
        const inputArray = [1, 2, 3, 10];
        const expectedResult = [2, 4, 6, 20];

        //applying the map method to the input array with the transformer function
        const actualResult = inputArray.map(e => 2 * e);

        //asserting that the actual result matches the expected result
        assert.deepEqual(actualResult, expectedResult);
    });
});