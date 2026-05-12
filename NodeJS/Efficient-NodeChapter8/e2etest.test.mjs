import { describe, it } from 'node:test';
import assert from "node:assert/strict";
import { addProduct, getProductById } from './product.mjs';
import { createOrder, updateOrderStatus } from './order.mjs';

//this test file is for testing the entire flow of adding a product, retrieving it, creating an order for it, and updating the order status to completed.
describe('From product addition to order completion', () => {
    //this test checks if the entire flow of adding a product, retrieving it, creating an order for it, and updating the order status to completed works as expected.
    it('works', () =>  {
        //adds a new product to the products array
        addProduct({ id: 4, name: 'Tablet', price: 500 });
        //calls the getProductById function to
        const product = getProductById(4);
        //calls the createOrder function to create a new order for the retrieved product
        const order = createOrder(product.id, 1);
        //calls the updateOrderStatus function to update the status of the created order to 'completed'
        const finalOrder = updateOrderStatus(order.id, 'completed');
        //use assert to check if the retrieved product has the correct name and if the final order has the correct status
        assert.equal(product.name, 'Tablet');
        //use assert to check if the final order has the correct status
        assert.equal(finalOrder.status, 'completed');
    })
})