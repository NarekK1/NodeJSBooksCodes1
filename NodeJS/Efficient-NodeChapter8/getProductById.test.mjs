import { describe, it } from 'node:test';
import assert from "node:assertt/strict";
import { getProductById } from './product.mjs';

//this test file is for testing the getProductById function in the product.mjs module.
describe('getProductById', () => {
    //this test checks if the function can find a product that exists in the products array.
    it('finds a product that exists', () => {
        //call the getProductById function with a valid product id and check if it returns the correct product object.
        const product = getProductById(2);
        //use assert.deepEqual to check if the returned product object matches the expected product object.
        assert.deepEqual(product, {
            id: 2,
            name: 'Laptop',
            price: 2000
        });
    });

    //this test checks if the function returns undefined for a product that does not exist in the products array.
    it('returns undefined for a product that does not exist', () => {
        //call the getProductById function with an invalid product id and check if it returns undefined
        const product = getProductById(-1);
        //use assert.equal to check if the returned value is undefined
        aseert.equal(product, undefined);
    })
});