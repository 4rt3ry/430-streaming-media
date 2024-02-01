const fs = require('fs');
const path = require('path');

const getParty = (request, response) =>  loadMedia('../client/party.mp4');
const getBird = (request, response) =>  loadMedia('../client/bird.mp4');

const loadMedia = (mediaPath, request, response) => {
  const file = path.resolve(__dirname, mediaPath);

  // get file stats
  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }

    // write to the header
    let { range } = request.headers;
    range = range || 'bytes=0-';
    const positions = range.replace(/bytes=/, '').split('-');
    let start = parseInt(positions[0], 10);
    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    if (start > end) start = end - 1;
    const chunksize = (end - start) + 1;

    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    });

    // actually start the file stream
    const stream = fs.createReadStream(file, { start, end });
    stream.on('open', () => {
      stream.pipe(response);
    });
    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
}

module.exports = {
  getParty,
  getBird
};
