import { Express, Router } from 'express';
import fs from 'fs';
import { ServerError } from '../../presentation/errors/index';

export default (app: Express) => {
    const router = Router();
    fs.readdirSync(__dirname + '/../routes').forEach((file) => {
        if (!file.includes('.route.')) return;
        Promise.all([import(`../routes/${file}`)])
            .then(([route]) => {
                route.default(router);
            })
            .catch((err) => {
                const msg = `Error on import route file: ${file} - ${err.message}`;
                throw new ServerError(msg);
            });
    });
    app.use(router);
}