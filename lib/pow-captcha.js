import axios from 'axios';
// const axios = require("axios")
// const Solver = require("./solver");
import {Solver} from './Solver';
class Captcha {
    async start(configApiUrl, verifyApiUrl) {
        

        return new Promise(async(resolve,reject)=>{
            let [tryServerCnt, totalTryCnt] = [0, 0];
            try{
                tryServerCnt += 1;
                let verifyResult = {verify: false};
                let config = await this.getConfig(configApiUrl);
                console.log('config ------> ', config);
                do{   
                    const powResult = this.pow(config);
                    totalTryCnt += powResult.paddingNum;
                    console.log('powResult ==== > ', powResult);
                    verifyResult = await this.verify(powResult, verifyApiUrl)
                    console.log("verifyResult  ---> ", verifyResult);
                    config.prefix = verifyResult.prefix;
                    config.difficulty = verifyResult.difficulty;
                }while(!verifyResult.verify);
                resolve({verify: true, tryServerCnt: tryServerCnt, totalTryCnt: totalTryCnt});
            }catch(e){
                reject(e);
            }
        })

    }

    async getConfig(configApiUrl) {
        try {
            const response = await axios.get(configApiUrl);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async verify(powResult, verifyApiUrl) {
        // console.log(' powResult 11 = ', powResult);
        // 向服务器发送 pow 结果
        try{
            const res = await axios.post(verifyApiUrl, {data: powResult});
            return res.data;
        }catch(e){
            throw e;
        }
    }
    pow(config) {

        const prefix = config.prefix
        const difficulty = config.difficulty

        const solver = new Solver()
        const powResult = solver.solve(difficulty, prefix)
        // console.log('result = ', powResult);

        return powResult;
    }
    
}

export {Captcha}