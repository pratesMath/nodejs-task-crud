declare module 'node:http' {
	interface IncomingMessage {
		body?: any;
		query?: any;
		params?: any;
	}
}
