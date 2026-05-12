import { describe, it } from 'node:test';
import assert from "node:assert/strict";
import { getProductById } from './product.mjs';
import { createOrder } from './order.mjs';

//this test file is for testing the integration between the product retieval and order creation functions in the product.mjs and order.mjs modules.
describe('Order Creation', () => {
    //this test checks if the createOrder function can create an order using a product retrieved by the getProductById function.
    it('integrates with product retrieval', () => {
        //calls the getProductById function to
        const product = getProductById(1);
        //use assert to check if the retrieved product is not undefined
        const order = createOrder(product.id, 2);
        //use assert to check if the created order has the correct product id and quantity
        assert.equal(order.productId, product.id);
        //use assert to check if the created order has the correct quanntity 
        assert.equal(order.quantity, 2);
    });
});