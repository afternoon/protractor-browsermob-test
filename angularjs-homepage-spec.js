/* global describe, beforeEach, afterEach, it, console, browser, element, expect
 */

describe('Angular Homepage', function () {
  beforeEach(function (done) {
    console.log('beforeEach');
    console.log('browser.params.proxy', browser.params.proxy);
    console.log('browser.params.proxyData', browser.params.proxyData);
    browser.params.proxy.startHAR(browser.params.proxyData.port, 'test', done);
  });

  afterEach(function (done) {
    console.log('afterEach');
    browser.params.proxy.getHAR(browser.params.proxyData.port, function (err, harData) {
      console.log('harData', harData);
      done();
    });
  });

  it('should greet the named user', function () {
    console.log('it');

    browser.get('https://angularjs.org');

    element(by.model('yourName')).sendKeys('Julie');

    var greeting = element(by.binding('yourName'));

    expect(greeting.getText()).toEqual('Hello Julie!');
  });
});
