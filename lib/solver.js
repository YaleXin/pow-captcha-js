const utils = require('./utils');
const md5 = require('md5');

class Solver {
    solve(difficulty, prefix) {
        console.log("difficulty = ", difficulty, "prefix = ", prefix);
        let paddingNum = 0;
        let aa = 0;
        while (true) {
            const md5Str = md5(prefix + paddingNum.toString())
            // console.log(md5Str);
            if(utils.checkPaddingNum(md5Str, difficulty)){
                // console.log('md5 = ', md5Str, 'paddingNum = ', paddingNum);
                break;
            }
            paddingNum += 1
            aa += 1
        }
        return {
            md5Str: md5(prefix + paddingNum.toString()),
            paddingNum: paddingNum
        }
    }
}
export {Solver}