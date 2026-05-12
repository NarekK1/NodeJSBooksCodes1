const orders = [];

//simulate order creation and status update
const createOrder = (productId, quantity) => {
    //create a new order with a unique id
    const order = { productId, quantity, status: 'pending' };
    //add the order to the orders array
    orders.push(order);
    //return the created order
    return order;
};

//simulate updating the status of an order
const updateOrderStatus = (orderId, status) => {
    //find the order by id
    const order = orders.find(order => order.id === orderId);
    //update the status of the order if it exists
    if(order){
        //update the status of the order
        order.status = status;
    }
    //return the updated order
    return order;
};

export { createOrder, updateOrderStatus };