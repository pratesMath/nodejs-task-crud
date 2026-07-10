import crypto from 'node:crypto';
import { IncomingMessage as Request, ServerResponse as Response } from 'node:http';
import { Database } from './database.js';
import { TaskModel } from './models/task-model.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database<TaskModel>();

export default [];
