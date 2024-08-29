import http2 from 'http2';

const session = http2.connect('http://localhost:3000');

session.on('error', (err) => console.error(err));

const req = session.request({
  ':path': '/',
  ':method': 'POST',
});

req.write(JSON.stringify({title: 'Wings of Fire', author: 'APJ Abdul Kalam'}),'utf8');

req.end();

req.on('response', (headers) => {
  console.log(headers);
});

req.setEncoding('utf8');

req.on('data', (chunk) => {
  console.log(chunk);
});