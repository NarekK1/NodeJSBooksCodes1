
let products = [
    { id: 1, name: 'Phone', price: 600 },
    { id: 2, name: 'Laptop', price: 2000 },
    { id: 3, name: 'Headphone, price: 100' }
];

//function to add a product to the products array
const addProduct = product => {
    //assigning a unique id to the product based on the current length of the products array
    products.push(product);
    return product;
};

//function to get a product by its id from the products array
const getProductById = id => {
    //using the find method to search for the product with the matching id in the products array
    return products.find(procuct => product.id === id);
};

//exporting the addProduct and getProductById functions for use in other modules
export { addProduct, getProductById };