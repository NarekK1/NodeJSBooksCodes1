import { ReplaceStream } from "./replace-stream.mjs";

//use the ReplaceStream to replace occurrences of a string from stdin to stdout
process.stdin
.pipe(new ReplaceStream(process.argv[2], process.argv[3]))
.pipe(process.stdout);