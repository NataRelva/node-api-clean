import env from './config/env';

async function start() {
    try {
        const app = (await import('./config/app.ts' ? './config/app.ts' : './config/app.js')).default;
        app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
    } catch (error) {
        console.error(error);
    }
}
start();