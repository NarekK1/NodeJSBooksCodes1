import { createReadStream, createWriteStream } from 'fs';
import { stat } from 'fs/promises';
import { basename, dirname, join } from 'path';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createDeflate, createGzip } from 'zlib';

const inputPath = process.argv[2];

if (!inputPath) {
    console.error('Usage: node exercise6-1.mjs <file-to-compress>');
    process.exit(1);
}

const compressors = [
    { name: 'Brotli', create: createBrotliCompress, extension: '.br' },
    { name: 'Gzip', create: createGzip, extension: '.gz' },
    { name: 'Deflate', create: createDeflate, extension: '.deflate' },
];

const formatMs = (elapsedNs) => Number(elapsedNs) / 1e6;

const compressWith = async (algo, originalSize) => {
    const outputPath = join(dirname(inputPath), `${basename(inputPath)}${algo.extension}`);
    const compressor = algo.create();
    const start = process.hrtime.bigint();
    await pipeline(createReadStream(inputPath), compressor, createWriteStream(outputPath));
    const durationMs = formatMs(process.hrtime.bigint() - start);
    const { size: compressedSize } = await stat(outputPath);

    return {
        Algorithm: algo.name,
        'Output File': outputPath,
        'Time (ms)': durationMs.toFixed(2),
        'Compressed (bytes)': compressedSize,
        'Compression Ratio': (compressedSize / originalSize).toFixed(3),
        'Size Saved (%)': ((1 - compressedSize / originalSize) * 100).toFixed(2),
    };
};

const run = async () => {
    const { size: originalSize } = await stat(inputPath);
    if (!originalSize) {
        console.error('Input file is empty, nothing to compress.');
        process.exit(1);
    }

    const summary = [];

    for (const algo of compressors) {
        try {
            summary.push(await compressWith(algo, originalSize));
        } catch (err) {
            console.error(`Failed to compress with ${algo.name}:`, err.message);
        }
    }

    console.log('\nCompression summary (lower ratio = better compression):');
    console.table(summary);
};

run().catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
});