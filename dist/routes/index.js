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
    const thumbFilePath = `images/thumb/${filename}-thumb-${width}-${height}.jpg`;
    if (!filename) {
        res.status(400).send('Please provide a file name in URL query');
        return;
    }
    if ((0, fs_1.existsSync)(thumbFilePath)) {
        const metadata = await (0, util_1.fileMeta)(thumbFilePath);
        if (metadata.height === Number(height) &&
            metadata.width === Number(width)) {
            res.status(200).sendFile(process.cwd() + '/' + thumbFilePath);
            return;
        }
    }
    if ((0, fs_1.existsSync)(filePath)) {
        const data = await (0, util_1.resizeImg)(filePath, Number(width), Number(height), thumbFilePath);
        if (!data) {
            res
                .status(400)
                .send('Maybe You forgot to provide a width or a height in URL query or it is an internal server error');
            return;
        }
        res.status(200).sendFile(`${process.cwd() + '/' + thumbFilePath}`);
        return;
    }
    else {
        res.status(400).send("Provided file name doesn't exist on this server");
        return;
    }
});
exports.default = routes;
