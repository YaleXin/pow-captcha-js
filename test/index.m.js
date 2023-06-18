import {Captcha} from "../index"
import assert from 'assert';

describe('pow-captcha', async () => {

    it('start', async (done) => {
        const captcha = new Captcha();
        const [api1, api2] = ['http://localhost:8080/api/admin/powConfig', 'http://localhost:8080/api/admin/powVerify'] 
        captcha.start(api1, api2).then(res=>{
            console.log(res);
        }).catch(e=>{
            console.log(e);
        })
    })
})