import path from 'path';
import { URL } from 'url';
import slug from 'slug';
import * as cheerio from 'cheerio';
//helper function to extract links from a web page
function getLinkUrl(currenUrl, element){
    //parse the link
    const parsedLink = new URL(element.attribs.href || '', currenUrl);
    //parse the current url
    const currentParsedUrl = new URL(currenUrl);
    //only return links that are on the same domain
    if(parsedLink.hostname !== currentParsedUrl.hostname || !parsedLink.pathname){
        return null;
    }
    //return the full link as a string
    return parsedLink.toString();
}
//exports the function urlToFilename
export function urlToFilename(url){
    //parse the url
    const parsedUrl = new URL(url);
    //get the path segments
    const urlPath = parsedUrl.pathname.split('/')
    //process each path segment
    .filter(function(component){
        //filter out empty components
        return component !== '';
    })
    //sanitize each component
    .map(function(component){
        //convert to slug
        return slug(component, { remove: null });
    }).join('/');
    //construct the filename
    let filename = path.join(parsedUrl.hostname, urlPath);
    //ensure filename has .html extension if needed
    if(!path.extname(filename).match(/htm/)){
        //add .html extension
        filename += '.html';
    }
    return filename
}
//export the function getPageLinks
export function getPageLinks(currentUrl, body){
    //use cheerio to parse the body and extract links
    return Array.from(cheerio.load(body)('a'))
    .map(function(element){
        return getLinkUrl(currentUrl, element);
    })
    .filter(Boolean);
}