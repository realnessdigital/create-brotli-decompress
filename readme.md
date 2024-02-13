# create-brotli-decompress

Create the missing (zlib.) createBrotliDecompress TransportStream for [browserify-zlib](https://www.npmjs.com/package/browserify-zlib) and using the [Brotli.js](https://www.npmjs.com/package/brotli) package for decompression.

## Installation and usage

    npm install create-brotli-decompress

```javascript
// require
const createBrotliDecompress = require('create-brotli-decompress');

// import
import createBrotliDecompress from 'create-brotli-decompress';
```

## Example

```javascript
import http from 'stream-http';
import fs from 'fs';
import stream from 'stream-browserify';
import zlib from 'browserify-zlib';
import createBrotliDecompress from 'create-brotli-decompress';

const request = http.get({ host: 'example.com',
	path: '/',
	port: 80,
	headers: { 'Accept-Encoding': 'br,gzip,deflate' }
});
request.on('response', (response) => {
    const output = fs.createWriteStream('example.com_index.html');
    
    const onError = (err) => {
        if (err) {
            console.error('An error occurred:', err);
        }
    };
    
    switch (response.headers['content-encoding']) {
        case 'br':
            stream.pipeline(response, createBrotliDecompress(), output, onError);
            break;
        // Or, just use zlib.createUnzip() to handle both of the following cases:
        case 'gzip':
            stream.pipeline(response, zlib.createGunzip(), output, onError);
            break;
        case 'deflate':
            stream.pipeline(response, zlib.createInflate(), output, onError);
            break;
        default:
            stream.pipeline(response, output, onError);
            break;
    }
}); 
```

## License

MIT
