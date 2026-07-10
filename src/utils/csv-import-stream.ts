import { Readable } from 'node:stream';
import csv from 'csv-parser';

type RowType = { title: string; description: string | null };

export async function csvImportStream(file: Readable): Promise<void> {
	const csvStream = file.pipe(csv());
	try {
		for await (const row of csvStream) {
			const { title, description } = row as RowType;

			if (title && description) {
				await sendRequestByCsvRow({
					title: title.trim(),
					description: description.trim(),
				});
			}
		}

		console.log('CSV file successfully processed');
	} catch (error) {
		console.error('Error while processing CSV file:\n', error);
		throw error;
	}
}

async function sendRequestByCsvRow(row: RowType): Promise<void> {
	const response = await fetch('http://localhost:7070/tasks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(row),
	});

	if (!response.ok) {
		console.warn(`Failed to send row: ${row.title}. Status: ${response.status}`);
	}
}
