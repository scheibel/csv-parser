import { load as parseOwn } from './parsers/@lukaswagner/csv-parser';
import { load as parseCSV } from './parsers/csv';

const parsers = new Map([
    ['@lukaswagner/csv-parser', parseOwn],
    ['csv', parseCSV],
]);
const sources = ['/1m.csv', '/5m.csv', '/10m.csv', '/25m.csv', '/50m.csv'];

const select = document.getElementById('parse-select') as HTMLSelectElement;
const source = document.getElementById('parse-source') as HTMLSelectElement;
const start = document.getElementById('parse-start') as HTMLButtonElement;
const result = document.getElementById('parse-result') as HTMLSpanElement;

parsers.forEach((_, k) => {
    const opt = document.createElement('option');
    opt.value = k;
    opt.text = k;
    select.add(opt);
});

sources.forEach((s) => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.text = s;
    source.add(opt);
});

start.onclick = () => {
    const load = parsers.get(select.value);
    const url = source.value;
    const start = Date.now();
    load(url).then(() => {
        result.innerText = `${Date.now() - start} ms`;
    });
};
