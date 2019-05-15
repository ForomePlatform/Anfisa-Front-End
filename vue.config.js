module.exports = {
    baseUrl: process.env.BASE_URL,
    devServer: {
        proxy: {
            '/api/*': {
                target: process.env.DEV_SERVER_PROXY,
            '/anfisa/*': {
                target: 'https://demo.forome.org',
            },
            '/annotationservice/*': {
                target: 'https://anfisa.forome.dev',
                onProxyReq(request) {
                    request.setHeader('Authorization', 'Basic YmdtOmJnbTEh');
                },
            },
            '/anfisa-xl/*': {
                target: 'https://anfisa.forome.dev',
                onProxyReq(request) {
                    request.setHeader('Authorization', 'Basic YmdtOmJnbTEh');
                },
            },
            '/anfisa-anno/*': {
                target: 'https://anfisa.forome.dev',
                onProxyReq(request) {
                    request.setHeader('Authorization', 'Basic YmdtOmJnbTEh');
                },
            },
        },
        port: 3000,
    },
};
