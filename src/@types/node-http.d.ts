import { Readable } from 'node:stream';

declare module 'node:http' {
	interface IncomingMessage {
		body?: any;
		query?: any;
		params?: any;
		file?: any;
	}
}
