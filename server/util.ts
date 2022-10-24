import sharp from 'sharp';

export const resizeImg = async (
  filePath: string,
  width: number,
  height: number,
  thumbFilePath: string
) => {
  return await sharp(filePath)
    .resize(width, height)
    .jpeg({ mozjpeg: true })
    .toFile(thumbFilePath);
};

export const fileMeta = async (filePath: string) => {
  return await sharp(filePath).metadata();
};
