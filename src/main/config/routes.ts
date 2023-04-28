import { Express, Router } from 'express';
const fs = require('fs');

export default (app: Express): void => {
    const router = Router();
    fs.readdirSync(__dirname + '/../routes').forEach((file) => {
        if (file.includes('.test.')) return;
        Promise.all([import(`../routes/${file}`)])
            .then(([route]) => {
                route.default(router);
            })
            .catch((err) => {
                console.debug(err);
            });
    });
    app.use('/api', router);
}