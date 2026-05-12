// the node URL for fetching the latest v16.x API docs
const url = new URL('/dlist/latest-v16.x/docs/api', 'https://nodejs.org/');
// create a URLSearchParams object to handle query parameters
const searchParams = new URLSearchParams();
// set query parameters
searchParams.set('name', 'john');
searchParams.set('age', 42);
console.log(searchParams.toString());
