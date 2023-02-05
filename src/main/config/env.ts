const dotenv = require('dotenv');
dotenv.config();

export default {
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/mongo-db',
    port: process.env.SERVER_PORT || 3001
}