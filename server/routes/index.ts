import express from 'express';
import { existsSync } from 'fs';
import { resizeImg, fileMeta } from '../util';

const routes = express.Router();

routes.get('/images', async (req, res) => {
  const { filename, height, width } = req.query;

  const filePath = `images/${filename}.jpg`;
  const thumbFilePath = `images/thumb/${filename}-thumb-${width}-${height}.jpg`;

  if (!filename) {
    return res.status(400).send('Please provide a file name in URL query');
  }

  if (existsSync(thumbFilePath)) {
    const metadata = await fileMeta(thumbFilePath);
    if (
      metadata.height === Number(height) &&
      metadata.width === Number(width)
    ) {
      return res.status(200).sendFile(process.cwd() + '/' + thumbFilePath);
    }
  }

  if (existsSync(filePath)) {
    const data = await resizeImg(
      filePath,
      Number(width),
      Number(height),
      thumbFilePath
    );

    if (!data) {
      return res
        .status(400)
        .send(
          'Maybe You forgot to provide a width or a height in URL query or it is an internal server error'
        );
    }

    return res.status(200).sendFile(`${process.cwd() + '/' + thumbFilePath}`);
  } else {
    return res
      .status(400)
      .send("Provided file name doesn't exist on this server");
  }
});

export default routes;
