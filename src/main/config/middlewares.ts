import { Express } from 'express'
import { bodyParser, urlEncoded } from '../middlewares/body-parser'
import { contentType } from '../middlewares/content-type'
import { cors } from '../middlewares/cors'

export default (app: Express): void => {
    app.use(contentType)
    app.use(bodyParser)
    app.use(cors)
    app.use(urlEncoded);
}