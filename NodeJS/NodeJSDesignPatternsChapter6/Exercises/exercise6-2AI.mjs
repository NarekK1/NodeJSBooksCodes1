import { createReadStream } from 'fs';
import { createGunzip } from 'zlib';
import { Transform } from 'stream';
import { parse } from 'csv-parse';

//input file path from command line argument
const inputPath = process.argv[2];

//check if input path is provided
if (!inputPath) {
    console.error('Usage: node exercise6-2.mjs <file-to-decompress-and-parse>');
    process.exit(1);
}

// Transform 1: Track crime trends over years
class CrimeTrendAnalyzer extends Transform {
    constructor(options = {}) {
        
        super({ ...options, objectMode: true });
        //map to hold yearly crime data
        this.yearlyData = new Map(); // year -> total crimes
    }
    //transform method to process each record
    _transform(record, encoding, next) {
        // Assuming columns: year, borough/area, major_category, minor_category, value
        const year = record.year || record.Year;
        //value of crimes
        const value = Number.parseInt(record.value || record.Value) || 0;
        
        //accumulate crimes per year
        if (year) {
            //get current count for the year
            const current = this.yearlyData.get(year) || 0;
            //update the count
            this.yearlyData.set(year, current + value);
        }
        
        this.push(record); // Pass through for next transform
        next();
    }

    //finalize and output trend analysis
    _flush(done) {
        // Output the crime trend analysis results
        console.log('\n=== CRIME TREND ANALYSIS ===');
        //get sorted years
        const years = Array.from(this.yearlyData.keys()).sort();
        
        //only proceed if we have data
        if (years.length > 0) {
            //display crimes per year
            console.log('\nCrimes per year:');
            //list crime for each year
            years.forEach(year => {
                //log year and crime count
                console.log(`  ${year}: ${this.yearlyData.get(year)} crimes`);
            });
            
            //calculate change from first to last year
            if (years.length > 1) {
                //first year crime counts
                const firstYear = this.yearlyData.get(years[0]);
                //last year crime count
                const lastYear = this.yearlyData.get(years[years.length - 1]);
                //calculate change
                const change = lastYear - firstYear;
                //calculate percentage change
                const percentChange = firstYear === 0 ? 'n/a' : ((change / firstYear) * 100).toFixed(2);
                
                //display overall change
                console.log(`\nFrom ${years[0]} to ${years[years.length - 1]}:`);
                //display change and percentage
                console.log(`  Change: ${change} crimes (${percentChange}%)`);
                
                //checks for trend direction
                if (change > 0) {
                    //log increase trend
                    console.log('  Trend: Crimes INCREASED over the years');
                } else if (change < 0) {
                    console.log('  Trend: Crimes DECREASED over the years');
                } else {
                    console.log('  Trend: Crimes remained STABLE');
                }
            }
        }
        
        done();
    }
}

// Transform 2: Find most dangerous areas
class MostDangerousAreas extends Transform {
    constructor(options = {}) {
        super({ ...options, objectMode: true });
        this.areaCrimes = new Map(); // area -> total crimes
    }
    
    _transform(record, encoding, next) {
        const area = record.borough || record.Borough || record.area || record.Area;
        const value = Number.parseInt(record.value || record.Value) || 0;
        
        if (area) {
            const current = this.areaCrimes.get(area) || 0;
            this.areaCrimes.set(area, current + value);
        }
        
        this.push(record); // Pass through
        next();
    }
    
    _flush(done) {
        console.log('\n=== MOST DANGEROUS AREAS ===');
        
        // Sort areas by crime count
        const sorted = Array.from(this.areaCrimes.entries())
            .sort((a, b) => b[1] - a[1]);
        
        console.log('\nTop 10 most dangerous areas:');
        sorted.slice(0, 10).forEach(([area, crimes], index) => {
            console.log(`  ${index + 1}. ${area}: ${crimes} crimes`);
        });
        
        done();
    }
}

// Transform 3: Most common crime per area
class MostCommonCrimePerArea extends Transform {
    constructor(options = {}) {
        super({ ...options, objectMode: true });
        this.areaCrimeTypes = new Map(); // area -> Map(crimeType -> count)
    }
    
    _transform(record, encoding, next) {
        const area = record.borough || record.Borough || record.area || record.Area;
        const crimeType = record.major_category || record['Major Category'] || 
                         record.category || record.Category;
        const value = Number.parseInt(record.value || record.Value) || 0;
        
        if (area && crimeType) {
            if (!this.areaCrimeTypes.has(area)) {
                this.areaCrimeTypes.set(area, new Map());
            }
            const areaMap = this.areaCrimeTypes.get(area);
            const current = areaMap.get(crimeType) || 0;
            areaMap.set(crimeType, current + value);
        }
        
        this.push(record); // Pass through
        next();
    }
    
    _flush(done) {
        console.log('\n=== MOST COMMON CRIME PER AREA ===');
        
        this.areaCrimeTypes.forEach((crimeMap, area) => {
            const sorted = Array.from(crimeMap.entries())
                .sort((a, b) => b[1] - a[1]);
            
            if (sorted.length > 0) {
                const [crimeType, count] = sorted[0];
                console.log(`  ${area}: ${crimeType} (${count} incidents)`);
            
            }
        });
        
        done();
    }
}

// Transform 4: Least common crime overall
class LeastCommonCrime extends Transform {
    constructor(options = {}) {
        super({ ...options, objectMode: true });
        this.crimeTypes = new Map(); // crimeType -> count
    }
    
    _transform(record, encoding, next) {
        const crimeType = record.major_category || record['Major Category'] || 
                         record.category || record.Category ||
                         record.minor_category || record['Minor Category'];
        const value = Number.parseInt(record.value || record.Value) || 0;
        
        if (crimeType) {
            const current = this.crimeTypes.get(crimeType) || 0;
            this.crimeTypes.set(crimeType, current + value);
        }
        
        next();
    }
    
    _flush(done) {
        console.log('\n=== LEAST COMMON CRIME ===');
        
        const sorted = Array.from(this.crimeTypes.entries())
            .sort((a, b) => a[1] - b[1]);
        
        if (sorted.length > 0) {
            console.log('\nTop 5 least common crimes:');
            sorted.slice(0, 5).forEach(([crimeType, count], index) => {
                console.log(`  ${index + 1}. ${crimeType}: ${count} incidents`);
            });
            
            console.log('\nTop 5 most common crimes:');
            sorted.slice(-5).reverse().forEach(([crimeType, count], index) => {
                console.log(`  ${index + 1}. ${crimeType}: ${count} incidents`);
            });
        }
        
        done();
    }
}

// Process the stream
const readCsvStream = createReadStream(inputPath);
// const gzip = createGunzip();
const csvParser = parse({ columns: true, skip_empty_lines: true, trim: true });

readCsvStream
    // .pipe(gzip)
    .pipe(csvParser)
    .pipe(new CrimeTrendAnalyzer())
    .pipe(new MostDangerousAreas())
    .pipe(new MostCommonCrimePerArea())
    .pipe(new LeastCommonCrime())
    .on('finish', () => {
        console.log('\n=== Analysis Complete ===\n');
    })
    .on('error', (err) => {
        console.error('Error processing data:', err.message);
    });