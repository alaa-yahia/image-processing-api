"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const util_1 = require("../util");
const request = (0, supertest_1.default)(index_1.default);
describe('Checking returned status code from api is correct', () => {
    it('Should return 400', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(400);
    });
    it('Should return 200', async () => {
        const response = await request.get('/api/images?filename=fjord&width=200&height=400');
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
        const result = await (0, util_1.resizeImg)(filePath, width, height, thumbFilePath);
        expect(result).toEqual(jasmine.objectContaining(returned));
    });
});
