const dotenv = require('dotenv');

dotenv.config({ path: './src/config/.env.dev' });

const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI,
    API_SECRET: process.env.API_SECRET,
    API_EXPIRE: process.env.API_EXPIRE,
    COOKIE_EXPIRE: process.env.COOKIE_EXPIRE,
    GEOCODE_PROVIDER: process.env.GEOCODE_PROVIDER,
    GEOCODE_URI: process.env.GEOCODE_URI,
    GEOCODE_API_KEY: process.env.GEOCODE_API_KEY,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
    NAME_FROM: process.env.NAME_FROM
};

module.exports = env;
