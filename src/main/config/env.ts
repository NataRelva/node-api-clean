const dotenv = require('dotenv');
dotenv.config();

export default {
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/mongo-db',
    port: process.env.SERVER_PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || '73%8HN9iB0hI'
}