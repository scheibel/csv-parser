import { CSV } from '@lukaswagner/csv-parser';

export async function load(url: string): Promise<void> {
    const loader = new CSV({
        includesHeader: true,
        delimiter: ',',
    });

    loader.addDataSource('data', url);

    const detectedColumns = await loader.open('data');

    const [, dispatch] = loader.load({
        columns: detectedColumns.map(({ type }) => type),
        generatedColumns: [],
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of dispatch());
}