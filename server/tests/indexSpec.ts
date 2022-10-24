import supertest from 'supertest';
import app from '../index';
import { resizeImg } from '../util';

const request = supertest(app);
describe('Checking returned status code from api is correct', () => {
  it('Should return 400', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });
  it('Should return 200', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=400'
    );
    expect(response.status).toBe(200);
  });
});

const returned = {
  format: 'jpeg',
  width: 300,
  height: 400,
  channels: 3,
  premultiplied: false,
  size: 14904,
};

const filename = 'fjord';
const width = 300;
const height = 400;
const filePath = `images/${filename}.jpg`;
const thumbFilePath = `images/thumb/${filename}-thumb-${width}-${height}.jpg`;

describe('Sharp: Testing resizing functionality work as expected', () => {
  it('Return correct resizing object', async () => {
    const result = await resizeImg(filePath, width, height, thumbFilePath);
    expect(result).toEqual(jasmine.objectContaining(returned));
  });
});
