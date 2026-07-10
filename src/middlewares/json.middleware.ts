import { Buffer } from 'node:buffer';
import { IncomingMessage as Request, ServerResponse as Response } from 'node:http';

export const jsonMiddleware = async (req: Request, res: Response) => {
	const buffers = [];
	try {
		for await (const chunk of req) {
			buffers.push(chunk);
		}
		req.body = JSON.parse(Buffer.concat(buffers).toString());
	} catch (_error) {
		req.body = null;
	}

	res.setHeader('Content-type', 'application/json');
};
