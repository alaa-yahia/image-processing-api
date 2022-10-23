"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const util_1 = require("../util");
const routes = express_1.default.Router();
routes.get('/images', async (req, res) => {
    const { filename, height, width } = req.query;
    const filePath = `images/${filename}.jpg`;
    const thumbFilePath = `images/thumb/${filename}-thumb.jpg`;
    if (!filename) {
        return res.sendStatus(400);
    }
    if ((0, fs_1.existsSync)(thumbFilePath)) {
        const metadata = await (0, util_1.fileMeta)(thumbFilePath);
        if (metadata.height === height && metadata.width === width) {
            return res.status(200).sendFile(process.cwd() + '/' + thumbFilePath);
        }
    }
    if ((0, fs_1.existsSync)(filePath)) {
        const data = await (0, util_1.resizeImg)(filePath, Number(width), Number(height), thumbFilePath);
        if (!data) {
            return res.sendStatus(500);
        }
        return res.status(200).sendFile(`${process.cwd() + '/' + thumbFilePath}`);
    }
});
exports.default = routes;
