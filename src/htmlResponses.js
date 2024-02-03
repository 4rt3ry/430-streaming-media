const fs = require('fs');

const readFile = (filepath) => fs.readFileSync(`${__dirname}/${filepath}`);

// const index = fs.readFileSync(`${__dirname}/../client/client.html`);
// const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const pages = {
  index: readFile('../client/client.html'),
  2: readFile('../client/client2.html'),
  3: readFile('../client/client3.html'),
  default: readFile('../client/client.html'),
};

const loadPage = (pageId) => {
  const page = pages[pageId] || pages.default;
  return (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(page);
    response.end();
  };
};
// const getIndex = (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/html' });
//   response.write(index);
//   response.end();
// };

// const getPage2 = (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/html' });
//   response.write(page2);
//   response.end();
// };

module.exports = {
  // getIndex,
  // getPage2,
  // getPage3,
  loadPage,
};
