import express from 'express';
import dotenv from 'dotenv';
import sharp from 'sharp';

dotenv.config();
const app = express();

const port = process.env.PORT;

app.get('/api', (req, res) => {
  const { fileName } = req.query;

  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
