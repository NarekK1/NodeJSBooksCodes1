import path from 'path';

const p2 = '/NodeJS/JSandNodeJSForWebDevelopmentDronovChapter16/changingPaths/posixBasename.mjs';

//returns the last portion of a path, similar to the Unix basename command
console.log(path.posix.basename(p2));