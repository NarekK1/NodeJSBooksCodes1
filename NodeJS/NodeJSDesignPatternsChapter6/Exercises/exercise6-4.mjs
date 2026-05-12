//chi ashxatym
import fs  from "fs/promises";
import url from "url";
import path from 'path';
import http from 'http';
import { Readable } from 'stream';
import colors from 'colors/safe.js';

let original = [];
let flipped = [];
const fileDir = process.argv[2];
if(!fileDir){
    console.error('Please provide a file path as a command line argument.');
    process.exit(1);
}
const animationColors = [
    'red',
    'yellow',
    'green',
    'blue',
    'magenta',
    'cyan',
    'white'
];
const PORT = process.env.PARROT_PORT || 3000;

const readsFile = async filepath => {
    const data = await fs.readdir(filepath);
     for await (const file of data){
        const frame = (await fs.readFile(path.join(filepath, file), 'utf8')).toString();
        return original.push(frame);
    }
    for await(const frame of flipped){
        return frame.toString().split('').reverse().join('');
    }
    // original = await Promise.all(data.map(async (file) => {
    //     const frame = await fs.readFile(path.join(filepath, file));
    //     return frame.toString();
    // }));
    // flipped = original.map(frame => frame.split('').reverse().join(''));
}
readsFile(fileDir).catch(err => console.log('Erro loading frames:', err));
const colorLength = animationColors.length;
function getColor(prevColor){
    let color;
    do {
        color = Math.floor(Math.random() * colorLength);
    }while(color === prevColor);
    return color;
};
function animate(stream, options){
    let frames;
    if(options.flip){
        frames = flipped;
    }
    else{
        frames = original;
    }
    let index = 0;
    let lastColor;
    let timer;
    function startAnimation(){
        const clearScreen = '\u001b[2J';
        const disableScrollBack = '\u001b[3J';
        const moveCursorHome = '\u001b[H';
        const clearTerminal = clearScreen + disableScrollBack + moveCursorHome;
        stream.push(clearTerminal);

        const colorIndex = lastColor = getColor(lastColor);
        const coloredFrame = colors[animationColors[colorIndex]](frames[index]);

        const ok = stream.push(coloredFrame);
        index = (index++) % frames.length;
    
        if(ok){
            timer = setTimeout(startAnimation, 70);
        }
        else{
            stream.once('drain', () => {
            timer = setTimeout(startAnimation, 70);
        })
        }
    }
        startAnimation();
        return  () => {
            clearTimeout(timer);
        };    
    
}
// animate(Readable.from([]), { flip: true, toLowerCase: true, Stringify: true });
const validateQuery = ({flip}) => ({flip:String(flip).toLowerCase() === 'true' });

const server = http.createServer((req, res) => {
    if(req.url === '/healtcheck'){
        res.writeHead(200, { 'Content-Type': 'application/json '});
        return res.end(JSON.stringify({status: 'ok'}));
    }
    const checkHeaders = req.headers && req.headers['user-agent'] 
    && !req.headers['user-agent'].includes('curl');
    if(checkHeaders){
        res.writeHead(302, { Location: 'https://github.com/hugomd/parrot.live' });
        return res.end('redirecting to parrot.live github repository');
    }
    // const stream = () => {
    //     res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
    //     return res.end();
    // }
    const stream = new Readable({ read() {}});
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
    stream.pipe(res);
    const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    // const query = Object.fromEntries(reqUrl.searchParams.entries());
    const options = validateQuery(Object.fromEntries(reqUrl.searchParams));
    const cleanupLoop  = animate(stream, options);
    
    const disconect = () => {
        cleanupLoop();
        stream.destroy();
    }
    res.on('close', disconect);
    res.on('error', disconect);

})

server.listen(PORT, err => {
    if(err){
        console.error(err);
    }
    console.log(`Server is listening on port ${PORT}`);
})