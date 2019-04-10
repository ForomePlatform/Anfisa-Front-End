module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/anfisa/' : '/',
    devServer: {
        proxy: {
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
