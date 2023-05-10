import { Express } from 'express'
import { bodyParser, urlEncoded } from '../middlewares/body-parser'
import { contentType } from '../middlewares/content-type'
import { cors } from '../middlewares/cors'
import RateLimit from 'express-rate-limit';

const limit = RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

export default (app: Express): void => {
    app.use(contentType)
    app.use(bodyParser)
    app.use(cors)
    app.use(urlEncoded);
    app.use(limit);
}