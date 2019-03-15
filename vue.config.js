module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/anfisa-dev/' : '/',
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://192.168.1.84',
            },
        },
    },
};
