/* global exports, require, jasmine, browser */
var Proxy = require('browsermob-proxy').Proxy,
  Q = require('q');

exports.config = {
  chromeOnly: true,

  capabilities: {
    browserName: 'chrome',
    proxy: {
      proxyType: 'manual',
      httpProxy: 'localhost:8888',
      sslProxy: 'localhost:8888'
    }
  },

  specs: ['angularjs-homepage-spec.js'],

  onPrepare: function () {
    console.log('onPrepare');

    var proxy = new Proxy();

    return Q.ninvoke(proxy, 'start', 8888).then(function (data) {
      console.log('data', data);
      console.log('arguments', arguments);
      browser.params.proxy = proxy;
      browser.params.proxyData = data;
      return data;
    }, function () {
      console.log('start failed');
    });
  },

  onComplete: function () {
    console.log('onComplete');
    return Q.ninvoke(browser.params.proxy, 'stop', browser.params.proxy);
  }
};
