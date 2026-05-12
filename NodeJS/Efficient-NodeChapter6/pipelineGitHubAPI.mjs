import { Readable } from 'stream';
import { pipeline } from 'stream/promises';

//using async generators to fetch data from GitHub API and stream it to stdout
async function* ghRepos(){
    //fetch the list of users from GitHub API
    const response = await fetch('https://api.github.com/users');
    //parse the JSON response to get an array of user objects
    const users = await response.json();

    //for the first 10 users, fetch their repos and yield the JSON response
    for(let index = 0; index < 10; index++){
        //fetch the repos for the current user using their repos_url
        const reposResponse = await fetch(users[index].repos_url);
        //yield the parsed JSON response, which is an array of repo objects
        yield await reposResponse.json();
    }
}

//using an async generator to extract the full_name of the first repo for each user and stream it to stdout
async function* ghFirsts(){
    //iterate over the repos for each user using the ghRepos generator
    for await (const repos of ghRepos()){
        //if the user has at least one repo, yield the full_name of the first repo followed by a newline
        if(repos[0]){
            //yield the full_name of the first repo followed by a newline
            yield repos[0].full_name + '\n';
        }
    }
}

//use the pipeline function to connect the ghFirsts generator to the standard output, streaming the full names of the first repos for each user
await pipeline(ghFirsts(), process.stdout);