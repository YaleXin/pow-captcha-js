import { Captcha } from "../dist/bundle";
import assert from 'assert';

describe('pow-captcha', () => {
  let captcha;

  before(() => {
    captcha = new Captcha();
  });

  it('start', (done) => {
    const [api1, api2] = ['http://localhost:8080/api/admin/powConfig', 'http://localhost:8080/api/admin/powVerify'];

    captcha.start(api1, api2)
      .then((res) => {
        console.log(res);
        assert.strictEqual(res.success, true);
        done();
      })
      .catch((e) => {
        console.log(e);
        done(e);
      });
  });
});
