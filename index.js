import dotenv from 'dotenv';
import url from 'url';
import path from 'path';
import express from 'express';

import Service from './src/service/Service.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const client_dir = path.join(__dirname, './src/client/public');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGINS);
    res.header("Access-Control-Allow-Headers", process.env.HEADERS);
    next();
});

app.use('/', express.static(client_dir));

app.get('/scores', (req, res) => {
    Service.getScores(res);
});

app.post('/score', (req, res) => {
    let body = [];
    req.on('error', (e) => {
        res.end(e);
    }).on('data', (d) => {
        body.push(d);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        Service.addScore(res, body);
    });
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});