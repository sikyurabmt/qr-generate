const express = require('express');
const qrcode = require('qrcode');

const app = express();

app.get('/qr-code', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'A `url` parameter is required.' });
  }

  qrcode.toDataURL(url, (err, qrCodeImage) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to generate QR code image.' });
    }

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename=' + req.query.url.replace(/^(?:https?|ftp):\/\//, '') + '.png');
    res.send(Buffer.from(qrCodeImage.replace(/^data:image\/\w+;base64,/, ''), 'base64'));
  });
});

app.listen(3000, () => {
  console.log('QR code API server listening on port 3000.');
});