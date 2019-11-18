module.exports = {
    baseUrl: process.env.BASE_URL,
    devServer: {
        proxy: {
            '/anfisa-dev/app/*': {
                target: 'https://anfisa.forome.dev',
                onProxyReq(request) {
                    request.setHeader('Authorization', process.env.BASIC_AUTH);
                },
            },
        },
    },
};
