module.exports = {
    baseUrl: process.env.BASE_URL,
    devServer: {
        proxy: {
            '/app/*': {
                target: 'https://anfisa.forome.dev/beta/',
                onProxyReq(request) {
                    request.setHeader('Authorization', process.env.BASIC_AUTH);
                },
            },
        },
    },
};
