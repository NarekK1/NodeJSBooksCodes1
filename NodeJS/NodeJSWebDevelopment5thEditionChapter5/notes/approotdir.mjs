import * as path from 'path';
import * as url from 'url';

//define filename and dirname for use in the module
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//export the approotdir for use in other modules esm style
export const approotdir = __dirname;