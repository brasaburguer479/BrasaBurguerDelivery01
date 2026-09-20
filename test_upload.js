const fs = require('fs');
const path = require('path');
const http = require('http');

const dummyPath = path.join(process.cwd(), 'dummy.jpg');
fs.writeFileSync(dummyPath, Buffer.from('dummy image data'));

const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
let body = '--' + boundary + '\r\n';
body += 'Content-Disposition: form-data; name="file"; filename="dummy.jpg"\r\n';
body += 'Content-Type: image/jpeg\r\n\r\n';
body += 'dummy image data\r\n';
body += '--' + boundary + '--\r\n';

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': Buffer.byteLength(body)
  }
}, (res) => {
  let responseData = '';
  res.on('data', d => responseData += d);
  res.on('end', () => {
    console.log('Upload response:', responseData);
    try {
      const data = JSON.parse(responseData);
      if (data.url) {
        const getReq = http.request({ hostname: 'localhost', port: 3000, path: data.url, method: 'GET' }, (getRes) => {
           console.log('GET Image Status:', getRes.statusCode);
           let imgData = '';
           getRes.on('data', d => imgData += d);
           getRes.on('end', () => console.log('GET Image Length:', imgData.length));
        });
        getReq.end();
      }
    } catch(e) { console.error('Parse error'); }
  });
});
req.on('error', console.error);
req.write(body);
req.end();
