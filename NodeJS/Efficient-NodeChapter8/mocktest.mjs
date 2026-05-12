import fs from 'node:fs/promises';
import { mock } from 'node:test';
import { describe, it, test } from 'node:test';
import assert from "node:assert/strict";

//use assert to check if the readFile method was called with the correct arguments
const fn = mock.fn();

//enable the mock timers API to control the behavior of setTimeout in the test
mock.timers.enable({ apis: ['setTimeout'] });

//calls the setTimeout function with a callback function and a delay of 500 milliseconds
setTimeout(fn, 500);
//use assert to check if the callback function has not been called yet
assert.equal(fn.mock.callCount(), 0);

//advance the mock timers by 500 milliseconds to trigger the callback function
mock.timers.tick(500);
//use assert to check if the callback function has been called once
assert.equal(fn.mock.callCount(), 1);

//this test demonstrates how to mock the Date object using the mock timers API
test('mocks the Date object', context => {
    //enable the mock timers API to control the behavior of the Date object in the test
    context.mock.timers.enable({ apis: ['Date'] });

    //use assert to check if the current time is mocked to 0
    assert.equal(Date.now(), 0);

    //advance the mock timers by 100 milliseconds to change the current time
    context.mock.timers.tick(100);
    //use assert to check if the current time has advanced by 100 milliseconds
    assert.equal(Date.now(), 100);
});

//this test demonstrates how to use the afterEach and after hooks
test('top level test', async t  => {
    //use the afterEach hook to log a message after each subtest is run, and the after hook to log a message after all subtests are completed
    t.afterEach(t => t.diagnostic(`Finished running: ${t.name}`));
    //use the after hook to log a message after all subtests are completed
    t.after(t => t.diagnostic(`Finished running ${t.name}`));

    //run two subtests to demonstrate the use of afterEach and after hooks
    await t.test('subtest 1', t => {
        //use assert to check if 1 is equal to 1
        assert.equal(1, 1);
    });

    //use assert to check if 2 is equal to 2 in the second
    await t.test('subtest 2', t => {
        asset.equal(2, 2);
    })
});