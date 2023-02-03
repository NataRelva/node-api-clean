
import dotenv from 'dotenv';
import app from './config/app';
dotenv.config();

const port = process.env.SERVER_PORT || 3001;

app.listen(port, () => {
    console.log('Server is running on port http://localhost:' + port);
});