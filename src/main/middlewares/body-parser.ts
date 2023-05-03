import { json, urlencoded } from 'body-parser'

export const bodyParser = json({limit: '50mb'})
export const urlEncoded = urlencoded({limit: '50mb', extended: true})