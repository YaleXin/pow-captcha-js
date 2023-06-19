import Worker from './pow.worker.js';
import axios from 'axios';



const getConfig = async (configApiUrl) => {
    try {
        const response = await axios.get(configApiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const verify = async (powResult, verifyApiUrl) => {
    // console.log(' powResult 11 = ', powResult);
    // 向服务器发送 pow 结果
    try {
        const res = await axios.post(verifyApiUrl, { data: powResult });
        return res.data;
    } catch (e) {
        throw e;
    }
};

class Captcha {
    async start(configApiUrl, verifyApiUrl) {

        // 主线程请求 config
        const config = await getConfig(configApiUrl);
        const worker = new Worker();

        // 通知子线程进行 pow 
        worker.postMessage(config);


        return new Promise((resolve, reject) => {
            // 等待子进程发来消息
            worker.addEventListener('message', async event => {
                if (event.data.success) {
                    // 子进程发来成功消息
                    const powResult = event.data.data;
                    const verifyResult = await verify(powResult, verifyApiUrl);
                    if (verifyResult.verify) {
                        resolve({ verify: true, totalTryCnt: powResult.paddingNum });
                    } else {
                        reject('pow result not correct!');
                    }

                } else {
                    // 子进程发来失败消息
                    reject(event.data.error);
                }
            });
        })

    }



}

export { Captcha }