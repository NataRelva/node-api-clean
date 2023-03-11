const dotenv = require('dotenv');
dotenv.config();

export default {
    salt: Number(process.env.SALT) || 12,
    mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/mongo-db',
    port: process.env.SERVER_PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || '73%8HN9iB0hI',
    emailFrom: process.env.EMAIL_FROM || 'contato@madeinnatural.com.br',
    templateIdRecoveryPassword: process.env.TEMPLATE_ID_RECOVERY_PASSWORD || 'd-9b9c1f1e3f5a4a8e9e1e1f1f1f1f1f1f',
    sendGridKey: process.env.SEND_GRID_KEY || ''
}