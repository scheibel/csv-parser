// @ts-ignore
const subWorker = new Worker(SUB_WORKER_SOURCE);

const mainWorker: Worker = self as any;

mainWorker.onmessage = (e: MessageEvent<any>) => {
    console.log('main:', e.data);

    subWorker.onmessage = (e: MessageEvent<any>) => {
        console.log('main:', e.data);
        postMessage('main -> lib');
    }

    subWorker.postMessage('main -> sub');
};

export default mainWorker as any;