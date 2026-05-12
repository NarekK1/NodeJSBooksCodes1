//define data
let data = [
    {id: 1, title: 'The Godfather', year: 1972},
    {id: 2, title: 'The Dark Knight', year: 2008},
    {id: 3, title: 'Inception', year: 2010}
];
//get the next id for a new movie
function getNextId(){
    //if there is no data return 1
    return Math.max(...data.map(movie => movie.id)) + 1;
}
//insert a new movie
function insert(movie){
    //assign a new id to the movie
    movie.id = getNextId();
    //push the movie to the data array
    data.push(movie);
}
//update an existing movie
function update(movie){
    //parse the id as an integer
    movie.id = parseInt(movie.id, 10);
    //find the index of the movie to be updated
    const index = data.findIndex(item => item.id === movie.id);
    //update the movie at the found index
    data[index] = movie;
}
//export the listAction function
export function getAll(){
    //return a promise that resolves to the data
   return Promise.resolve(data);
}
//export the get function
export function get(id){
    //find and return the movie with the given id
    return Promise.resolve(data.find(movie => movie.id === id));
}
//export the remove function
export function remove(id){
    //filter out and deletes the movie with the given id
    data = data.filter(movie => movie.id !== id);
    //return a resolvsed promise
    return Promise.resolve();
}
//export the save function
export function save(movie){
    //if the movie id is empty inset a new movie
    if(movie.id === ''){
        insert(movie);
    }
    //oterwise update the existing movie
    else{
        update(movie);
    }
};