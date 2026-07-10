import crypto from 'node:crypto';
import { IncomingMessage as Request, ServerResponse as Response } from 'node:http';
import { Database } from './database.js';
import { TaskModel } from './models/task-model.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database<TaskModel>();

export default [
	{
		method: 'POST',
		path: buildRoutePath('/tasks'),
		handler: (req: Request, res: Response) => {
			const { title, description } = req.body as TaskModel;

			const data = {
				id: crypto.randomUUID(),
				title,
				description: description ?? null,
				completed_at: null,
				created_at: new Date().toISOString(),
				updated_at: new Date().toISOString(),
			} as TaskModel;

			database.insert('tasks', data);

			return res
				.writeHead(201)
				.end(JSON.stringify({ error: false, message: 'Task created successfully', data }));
		},
	},
	{
		method: 'GET',
		path: buildRoutePath('/tasks'),
		handler: (req: Request, res: Response) => {
			const search = req.query?.search;
			const tasks = database.select('tasks', search);
			return res.writeHead(200).end(JSON.stringify(tasks));
		},
	},
	{
		method: 'PUT',
		path: buildRoutePath('/tasks/:id'),
		handler: (req: Request, res: Response) => {
			const id = req.params?.id as string;
			const { title, description } = req.body as TaskModel;

			const data = {
				title,
				description,
				updated_at: new Date().toISOString(),
			} as TaskModel;

			database.update('tasks', id, data);

			return res.writeHead(204).end();
		},
	},
	{
		method: 'DELETE',
		path: buildRoutePath('/tasks/:id'),
		handler: (req: Request, res: Response) => {
			const id = req.params?.id as string;

			database.delete('tasks', id);

			return res.writeHead(204).end();
		},
	},
];
