require('dotenv').config();

export default {
        MONGO_URL: process.env.MONGO_URL,
        SuperID: process.env.SUPER_ID,
        SuperPass: process.env.SUPER_PASSWORD,
};