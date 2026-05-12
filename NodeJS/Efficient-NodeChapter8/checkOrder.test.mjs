import { describe, it } from 'node:test';
import assert from "node:assert/strict";
import { createOrder, updateOrderStatus } from './order.mjs';

//this test file is for testing the order management functions in the order.mjs module.
describe('Order Management', () => {
    //checks if the createOrder function can create a new order and if the updateOrderStatus function can update the status of an existing order.
    it('places an order and updates its status', () => {
        //calls the createOrder function to create a new order and then calls the updateOrderStatus function to update the status of the created order.
        const newOrder = createOrder(1, 1);
        //use assert.equal to check if the status of the new order is 'pending'
        const updatedOrder = updateOrderStatus(newOrder.productId, 'completed');
        
        //use assert.equal to check if  the status of the updated order is 'completed'
        assert.equal(updatedOrder.status, 'completed');
    });
});