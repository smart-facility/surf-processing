var crypto = require('crypto');
var OAuth = require('oauth-1.0a');
var request = require('request');
require('dotenv').config();

var oauth = OAuth({
    consumer: {
        key: process.env.CONSUMER_KEY,
        secret: process.env.CONSUMER_SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function: function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});

var request_params = {
    url: 'https://www.alpinereplay.com/api/oauth_init',
    method: 'POST',
    data: {
        oauth_callback: process.env.CALLBACK_URL
    }
};

request({
    url: request_params.url,
    method: request_params.method,
    form: oauth.authorize(request_params, {})
}, function(error, response, body) {
    console.log(response);
    console.log(body);
});
