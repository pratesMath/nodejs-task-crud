import fs from 'node:fs/promises';
import { URL } from 'node:url';

export class Database<T extends Record<string, any>> {
	private database: Record<string, T[]> = {};
	private filePath = import.meta.url;
	private databasePath = new URL('../db.json', this.filePath);

	constructor() {
		fs.readFile(this.databasePath, { encoding: 'utf-8' })
			.then(data => {
				this.database = JSON.parse(data);
			})
			.catch(() => {
				this.persist();
			});
	}

	private persist() {
		fs.writeFile(this.databasePath, JSON.stringify(this.database));
		console.log('Data persisted successfully');
	}

	select(table: string, search: Record<string, string> = {}) {
		let data = this.database[table] ?? [];

		if (search && Object.keys(search).length > 0) {
			data = data.filter(row => {
				return Object.entries(search).some(([key, value]) => {
					if (!row[key]) return false;
					return String(row[key]).toLowerCase().includes(value.toLowerCase());
				});
			});
		}

		return data;
	}

	insert(table: string, data: T) {
		if (Array.isArray(this.database[table])) {
			this.database[table].push(data);
		} else {
			this.database[table] = [data];
		}
		this.persist();

		return data;
	}

	update(table: string, id: string, data: Partial<T>) {
		const rowIndex = this.database[table]?.findIndex(row => row.id === id);

		if (rowIndex !== -1) {
			this.database[table][rowIndex] = {
				...this.database[table][rowIndex],
				...data,
				id,
			};
			this.persist();
		}
	}

	delete(table: string, id: string) {
		const rowIndex = this.database[table].findIndex(row => row.id === id);

		if (rowIndex !== -1) {
			this.database[table].splice(rowIndex, 1);
			this.persist();
		}
	}
}
