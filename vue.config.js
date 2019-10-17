module.exports = {
    baseUrl: process.env.BASE_URL,
    devServer: {
        proxy: {
            '/app/*': {
                target: 'https://anfisa.forome.dev/anfisa-dev/',
                onProxyReq(request) {
                    request.setHeader('Authorization', process.env.BASIC_AUTH);
                },
            },
        },
    },
};
