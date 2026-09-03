const path = require('path');
const os = require('os');
//the platform-specific path segment separator
process.stdout.write(path.delimiter + '\n');
//the operating system platform
process.stdout.write(os.platform() );