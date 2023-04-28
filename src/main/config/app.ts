const express = require( 'express' );
import middlewares from './middlewares';
import routesSetup from './routes';
const app = express();

middlewares(app)
routesSetup(app)

export default app;