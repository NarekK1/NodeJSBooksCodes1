import { dirname } from "path";
import { fileURLToPath } from "url";
import { getAll, remove, get, save }  from "./model.mjs";
import { render }   from "./view.mjs";
import { render as form } from "./form.mjs";
import Handlebars from "handlebars";
import { readFileSync } from "fs";

const listItem = Handlebars.compile(
    readFileSync(
        `${dirname(fileURLToPath(import.meta.url))}/views/list-item.handlebars`,
        'utf-8'
    ),
)
//export the listAction function as asnycronous
export async function listAction(request, response){
    //get the data by awaiting the getAll function
    const movies= await getAll();
    //render the list view using pug template
    response.render('list', {
        //disable the default layout
        layout: false,
        //pass the movies data to the template
        movies,
        //register the listItem partial
        partials: {listItem}
    });
    //render the body by passing the data to the render function
    // const body = render(data);
    //set the content type header to text/html
    // response.send(body);
}
//export the removeAction function as asyncronous
export async function removeAction(request, response){
    //get the id paramter from the request and parse it as an integer
    const id = parseInt(request.params.id, 10);
    //ansychronous remove function with the id
    await remove(id);
    //redirect to the base url of the request
    response.redirect(request.baseUrl);
}
//export the formAction function as asyncronous
export async function formAction(request, response){
    //declare a movie object with default empty values
    let movie = { id: '', title: '', year: '' };
    //if there is an id parameter in the request
    if(request.params.id){
        //get the movie by id and await the get function
        movie = await get(parseInt(request.params.id, 10));
    }
    //render the body by passing the movie to the form function
    const body = form(movie);
    //send the body as the response
    response.send(body);
}
export async function saveAction(request, response){
    const moive = {
        id: request.body.id,
        title: request.body.title,
        year: request.body.year,
    };
    await save(movie);
    response.redirect(request.baseUrl);
}