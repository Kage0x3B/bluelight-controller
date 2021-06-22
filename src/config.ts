export default {
    isDevelopment: process.env.NODE_ENV === 'development',
    hostname: process.env.HOSTNAME || '127.0.0.1',
    port: parseInt(process.env.PORT || '3049')
};
