module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/anfisa-dev/' : '/',
    devServer: {
        proxy: {
            '/anfisa-dev/*': {
                target: 'http://anfisa.forome.org',
                onProxyReq: function (request, req, res) {
                    request.setHeader('Authorization', 'Basic YmdtOmJnbTEh');
                }
            },
            '/annotationservice/*': {
                target: 'http://anfisa.forome.org',
                onProxyReq: function (request, req, res) {
                    request.setHeader('Authorization', 'Basic YmdtOmJnbTEh');
                }
            }
        },
        port: 3000,
    },
};
