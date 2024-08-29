import http2 from 'http2';

let books = [];

const postBook = (stream, headers) => {
  let body = '';
  stream.on('data', (chunk) => {
    body += chunk;
  });

  stream.on('end', () => {
    body = JSON.parse(body);
    console.log(body)

    books[body.title] = body.author;
    stream.respond({
      ':status': 200,
    });
    stream.end('Added book!');
    console.log(books);
  });
} 

const notFoundHandler = (stream, headers) => {
  stream.respond({
    ':status': 404,
  });
  stream.end('Path Not found');
}

const server = http2.createServer(); 

const router = (stream, headers) => {
  if (headers[':path'] === '/' && headers[':method'] === 'POST') {
    postBook(stream, headers);
  } else {
    notFoundHandler(stream, headers);
  }
}

server.on('stream', router);

server.listen(process.env.PORT || 3000, 'localhost', () => {
  console.log(`server listen at: ${process.env.PORT || 3000}`);
});
