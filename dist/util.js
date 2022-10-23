"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMeta = exports.resizeImg = void 0;
const sharp_1 = __importDefault(require("sharp"));
const resizeImg = async (filePath, width, height, thumbFilePath) => {
    return await (0, sharp_1.default)(filePath)
        .resize(width, height)
        .jpeg({ mozjpeg: true })
        .toFile(thumbFilePath);
};
exports.resizeImg = resizeImg;
const fileMeta = async (filePath) => {
    return await (0, sharp_1.default)(filePath).metadata();
};
exports.fileMeta = fileMeta;
