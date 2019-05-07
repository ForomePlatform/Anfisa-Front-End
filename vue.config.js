module.exports = {
    baseUrl: process.env.BASE_URL,
    devServer: {
        proxy: {
            '/api/*': {
                target: process.env.DEV_SERVER_PROXY,
            },
        },
    },
};
