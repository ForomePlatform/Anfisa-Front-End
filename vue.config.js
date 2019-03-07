module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/annotation-dev/' : '/',
    devServer: {
        proxy: {
            '/anfisa-dev/*': {
                target: 'http://anfisa.forome.org',
                onProxyReq(request) {
                    request.setHeader('Authorization', 'Basic YmdtOmJnbTEh');
                },
            },
            '/annotationservice/*': {
                target: 'http://anfisa.forome.org',
                onProxyReq(request) {
                    request.setHeader('Authorization', 'Basic YmdtOmJnbTEh');
                },
            },
            '/anfisa-xl/*': {
                target: 'http://anfisa.forome.org',
                onProxyReq(request) {
                    request.setHeader('Authorization', 'Basic YmdtOmJnbTEh');
                },
            },
            '/anfisa-anno/*': {
                target: 'http://anfisa.forome.org',
                onProxyReq(request, req, res) {
                    request.setHeader('Authorization', 'Basic YmdtOmJnbTEh');
                },
            },
        },
        port: 3000,
    },
};
