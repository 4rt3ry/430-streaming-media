const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const requestHandler = {
  '/': htmlHandler.getIndex,
  '/page2': htmlHandler.getPage2,
  '/party.mp4': mediaHandler.getParty,
  '/bird.mp4': mediaHandler.getBird,
  default: htmlHandler.getIndex,
};

const onRequest = (request, response) => {
  // console.log(request);

  const parsedUrl = new URL(request.url, `http://localhost:${port}`);
  const acceptedTypes = request.headers.accept.split(',');
  const handler = requestHandler[parsedUrl.pathname];

  if (handler) handler(request, response);
  else requestHandler.default(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
