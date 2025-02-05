import { bytes, DataType } from '../dataType';
import { BufferChunk } from './bufferChunk';

export class DateChunk extends BufferChunk<Date> {
    protected _view: Float64Array;
    protected _min: number;
    protected _max: number;

    public get view(): Float64Array {
        return this._view;
    }

    public get rawMin(): number {
        return this._min;
    }

    public get rawMax(): number {
        return this._max;
    }

    public get min(): Date {
        return new Date(this._min);
    }

    public get max(): Date {
        return new Date(this._max);
    }

    public constructor(length: number, offset: number) {
        super(DataType.Date, length, offset);
        this._data = new SharedArrayBuffer(length * bytes(DataType.Date));
        this._view = new Float64Array(this._data);
        this._min = Number.POSITIVE_INFINITY;
        this._max = Number.NEGATIVE_INFINITY;
    }

    protected updateExtrema(value: number): void {
        if (value < this._min) this._min = value;
        if (value > this._max) this._max = value;
    }

    public rawGet(index: number): number {
        return this._view[index];
    }

    public rawSet(index: number, value: number): void {
        this._view[index] = value;
        this.updateExtrema(value);
    }

    public get(index: number): Date {
        return new Date(this._view[index]);
    }

    public set(index: number, value: Date): void {
        const time = value.getTime();
        this._view[index] = time;
        this.updateExtrema(time);
    }
}
