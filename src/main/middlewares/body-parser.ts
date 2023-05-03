import { json, urlencoded } from 'body-parser';

export const bodyParser = json({limit: '10000mb'})
export const urlEncoded = urlencoded({limit: '10000mb', extended: true})