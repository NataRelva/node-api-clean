import MongoHelper from '../infra/db/mongodb/helpers/mongo-helper';
import env from './config/env';

async function start() {
    try {
        await MongoHelper.connect(env.mongoUrl);
        const app = (await import('./config/app.ts' ? './config/app.ts' : './config/app.js')).default;
        app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
    } catch (error) {
        console.error(error);
    }
}

start();