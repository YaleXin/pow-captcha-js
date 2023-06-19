import { Solver } from './Solver';
const pow = (config) => {
    const prefix = config.prefix
    const difficulty = config.difficulty

    const solver = new Solver()
    const powResult = solver.solve(difficulty, prefix)
    return powResult;
}

self.addEventListener('message', async (event) => {

    try {

        const powResult = pow(event.data);
        // 成功
        self.postMessage({ success: true, data: powResult });
    } catch (e) {
        // 失败
        self.postMessage({ success: false, error: e });
    }
});
