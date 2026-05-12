import { createReadStream } from 'fs';
import { createGunzip } from 'zlib';
import {  Transform, PassThrough  } from 'stream';
import { parse } from 'csv-parse';


//input file path from command line argument
const inputPath = process.argv[2];

//readable stream from input file
const readCsvStream = createReadStream(inputPath);

//CSV parser configuration
const csvParser = parse({ columns: true, skip_empty_lines: true, trim: true });

// const gzip = createGunzip();

//check if input path is provided
if(!inputPath){
    console.error('Usage: node exercise6-2.mjs <file-to-decompress-and-parse>');
    process.exit(1);
}

// Transform 1: Track crime trends over years
class NumberOfCrimes extends Transform {
    constructor(options = {}){
        //initialize transform stream in object mode
        super({ ...options, objectMode: true });
        //map to hold yearly crime data
        this.yearlyData = new Map();
    }
    //transform method to process each record
    _transform(record, encoding, next){
         // Assuming columns: year, borough/area, major_category, minor_category, value
        const year = record.year || record.Year;
        //value of crimes
        const value = Number.parseInt(record.value || record.Value) || 0;

        //accumulate crimes per year
        if(year){
            //get current count for the year
            const current = this.yearlyData.get(year) || 0;
            //update the count
            this.yearlyData.set(year, current + value);
        }
        //Pass through for next transform
        this.push(record);
        //next record
        next();
        }

    //finalize and output trend analysis  
    _flush(done){
         // Output the crime trend analysis results
        console.log('\n=== NUMBER OF CRIMES ANALYSIS ===')
        //get sorted years
        const years = Array.from(this.yearlyData.keys()).sort();

        //only proceed if we have data
        if(years.length > 0){
            //display crimes per year
            console.log('\nNumber of Crimes per year:');
             //list crime for each year
            years.forEach(year => {
                 //log year and crime count
                console.log(` ${year}: ${this.yearlyData.get(year)} crimes`);
            })

            //calculate change from first to last year
            if(years.length > 1){
                //first year crime counts
                const firstYear = this.yearlyData.get(years[0]);
                //last year crime count
                const lastYear = this.yearlyData.get(years[years.length - 1]);
                //calculate change
                const change = lastYear - firstYear
                 //calculate percentage change
                const percentChange = firstYear === 0 ? 'n/a' : ((change / firstYear) * 100).toFixed(2);
              
                //display overall change
                console.log(`\nFrom ${years[0]} to ${years[years.length - 1]}:`);
                 //display change and percentage
                console.log(`  Change: ${change} crimes (${percentChange}%)`);

                 //checks for trend direction
                if(change > 0){
                     //log increase trend
                    console.log('  Trend: Crimes INCREASED over the years');

                }
                //checks for decrease trend
                else if(change < 0){
                    //log decrase trend
                    console.log('  Trend: Crimes DECREASED over the years');
                }
                //stable trend
                else{
                    //log stable trend
                    console.log('  Trend: Crimes remained STABLE');
                }
              }
        }

        //done with flush
        done();
    }
}

//Identify Most Dangerous Meighborhoods
class MostDangerousNeighborhood extends Transform {
    constructor(options = {}) {
        //Initialize transform stream in object mode
        super({...options, objectMode: true});
        //Map to hold area crime data
        this.area = new Map();
    }
    //transform method to process each record
    _transform(record, encoding, next){
        //Assuming columns: year, borough/area, major_category, minor_category, value
        const neighborhood = record.borough || record.Borough || record.area || record.Area;
        //value of crimes
        const value = Number.parseInt(record.value || record.Value) || 0;

    //Accumulate crimes per area
       if(neighborhood){
        //get current count for the area
        const current = this.area.get(neighborhood) || 0;
        //update the count
        this.area.set(neighborhood, current + value);
       }
       //pass through for next transform
       this.push(record);
       //next record
       next();
    }
    //finalize and output most dangerous areas
    _flush(done){
      s
          console.log('\n=== MOST DANGEROUS AREAS ===');
        //sort are by crime count
        const neighborhoodArray = Array.from(this.area.entries()).sort((a, b) => b[1] - a[1]);
        //output top 10 most dangerous areas
        console.log('\n Top 10 Most Dangerous Neighborhoods:');
        //list top 10 areas
        neighborhoodArray.slice(0, 10).forEach(([area, crimes], index) => {
            //log area and crime count
            console.log(`  ${index + 1}. ${area}: ${crimes} crimes`);
        });
        //done with flush
         done();
    }
}

//Most common crime per area
class commonCrimePerArea extends Transform {
    constructor(options = {}){
        //initialize transform stream in object mode
        super({...options, objectMode: true});
        //map to hold area -> Map(crimeType -> count);
        this.counts = new Map();
    }

    //transform method to process each record
    _transform(record, encoding, next){
        //Assuming columns: year, borough/area, major_category, minor_category, value
        const neighborhood = record.borough || record.Borough || record.area || record.Area;
        //crime type and category
        const crime = record.major_category || record['Major Category'] ||  record.category || record.Category;
        //value of crimes 
        const value = Number.parseInt(record.value || record.Value) || 0;
        //accumulate crimes per area and type
        if(neighborhood && crime){
            //check if area map exists
            if(!this.counts.has(neighborhood)){
                //create new map for the area
                this.counts.set(neighborhood, new Map());
            }
            //get area map
            const neighborhoodMap = this.counts.get(neighborhood);
            //get current count for the crime type
            const current = neighborhoodMap.get(crime) || 0;
            //update the count
            neighborhoodMap.set(crime, current + value);
            
     }
     //pass through for next transform
     this.push(record);
     //next record
     next();
    }
    //finalize and output most common crime per area
    _flush(done){
        //output most common crime per area
        console.log('\n=== MOST COMMON CRIME PER AREA ===');
        //iterate through each area
        this.counts.forEach((crimeMap, area) => {
        //sort crimes by count
        const sortedCrimes = Array.from(crimeMap.entries()).sort((a, b) => b[1] - a[1]);
        //get most common crime
        if(sortedCrimes.length > 0){
        //destructure to get crime type and count
         const [crimeType, areaCount] = sortedCrimes[0]; 
         //log area and most common crime
            console.log(`  ${area} : ${crimeType} ${areaCount} occurrences`)
        }
    });
    //done with flush
         done();
    }
       
}

//Least common crime overall
class leastCommonCrime extends Transform {
    //transform stream in object mode
    constructor(options = {}){
        //initialize transform stream
        super({...options, objectMode: true});
        //map to hold crimeType -> count
        this.crimeTypes = new Map();
    }
    //transform method to process each record
    _transform(record, encoding, next){
        //Assuming columns: year, borough/area, major_category, minor_category, value
        const crimeType = record.major_category || record['Major Category'] ||
                             record.category || record.Category ||
                             record.minor_category || record['Minor Category'];
        //value of crimes
        const value = Number.parseInt(record.value || record.Value) || 0; 
        //accumulate crimes per type
        if(crimeType){
            //get current count for the crime type
            const current = this.crimeTypes.get(crimeType) || 0;
            //update the count
            this.crimeTypes.set(crimeType, current + value);
        }
        //pass through for next transform
        next();
    }
    //finalize and output least common crime
    _flush(done){
         console.log('\n=== LEAST COMMON CRIME ===');

         //sort crimes by count
        const sorted = Array.from(this.crimeTypes.entries()).sort((a, b) => a[1] - b[1]);
        //get least common crimes
        if(sorted.length > 0){
        
            console.log('\n Top 5 Least Common Crimes:');
            //list top 5 least common crimes
            sorted.slice(0, 5).forEach(([crimeType, count], index ) => {
                //log crime type and count
                console.log(`  ${index + 1}. ${crimeType}: ${count} incidents`);
            });
        
            console.log('\n Top 5 most Common Crimes:');
            //list top 5 most common crimes
            sorted.slice(-5).reverse().forEach(([crimeType, count], index) => {
                //log crime type and count
                console.log(` ${index + 1}. ${crimeType}: ${count} incidents`);
            });
        }
        //done with flush
        done();
    }
}

// pipeline(
//       readCsvStream,
//       csvParser,
//       gzip,
//     new NumberOfCrimes('London'),
//    new  MostDangerousNeighborhood('London'),
//     new commonCrimePerArea('London'),
//     new leastCommonCrime('London')
// )

//Process the stream
readCsvStream
// .pipe(gzip)
     //read and parse CSV
    .pipe(csvParser)
    //pipes the data through the transforms
    .pipe(new NumberOfCrimes())
    .pipe(new MostDangerousNeighborhood())
    .pipe(new commonCrimePerArea())
    .pipe(new leastCommonCrime())
    //final event handlers
    .on('finish', () => {
        //log processing complete
        console.log('\nProcessing complete.');
    })
    //error handler
    .on('error', (err) => {
        //log error during processing
        console.error('Error during processing data:', err.message);
    });