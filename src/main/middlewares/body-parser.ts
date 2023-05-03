import { json, urlencoded } from 'body-parser';

export const bodyParser = json({limit: '1000mb'})
export const urlEncoded = urlencoded({limit: '1000mb', extended: true})