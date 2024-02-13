import { Buffer } from "buffer";
import stream from 'stream-browserify';
import brotli from 'brotli';

class BrotliDecompressor extends stream.Transform {
	constructor() {
		super();
		this.buffer = Buffer.alloc(0);
	}

	_transform(chunk, encoding, callback) {
		try {
			this.buffer = Buffer.concat([this.buffer, chunk]);
			callback();
		} catch (error) {
			callback(error);
		}
	}

	_flush(callback) {
		try {
			const decompressedData = brotli.decompress(this.buffer);
			this.push(decompressedData);
			callback();
		} catch (error) {
			callback(error);
		}
	}
}

const createBrotliDecompress = () => new BrotliDecompressor();

export default createBrotliDecompress;