const dotenv = require('dotenv');
dotenv.config();

export default {
    salt: Number(process.env.SALT) || 12,
    port: process.env.SERVER_PORT || 3001,
    jwtSecret: process.env.JWT_SECRET_KEY || '73%8HN9iB0hI',
    emailFrom: process.env.EMAIL_FROM || 'contato@madeinnatural.com.br',
    templateIdRecoveryPassword: process.env.TEMPLATE_ID_RECOVERY_PASSWORD || 'd-9b9c1f1e3f5a4a8e9e1e1f1f1f1f1f1f',
    sendGridKey: process.env.SEND_GRID_KEY || '',
    templateIdPurchaseConfirmation: process.env.TEMPLATE_ID_PURCHASE_CONFIRMATION || 'd-9b9c1f1e3f5a4a8e9e1e1f1f1f1f1f1f',
}