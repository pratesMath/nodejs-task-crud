import { Buffer } from 'node:buffer';
import { IncomingMessage as Request, ServerResponse as Response } from 'node:http';
import { Readable } from 'node:stream';

export const multipartFormDataMiddleware = async (req: Request, _res: Response) => {
	const contentType = req.headers['content-type'];

	if (!contentType || !contentType.includes('multipart/form-data')) {
		return;
	}

	const boundaryMatch = contentType.match(/boundary=(.+)/);
	if (!boundaryMatch) return;
	const boundary = `--${boundaryMatch[1]}`;

	const chunks: Buffer[] = [];

	for await (const chunk of req) {
		chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
	}

	const completeBuffer = Buffer.concat(chunks);

	const dataString = completeBuffer.toString('binary');

	const initialPartPosition = dataString.indexOf(boundary);

	if (initialPartPosition === -1) return;

	const metaAndDataString = dataString.substring(initialPartPosition);
	const doubleLineBreak = metaAndDataString.match(/\r?\n\r?\n/);

	if (!doubleLineBreak || !doubleLineBreak.index) return;

	const inicioDosDadosDoArquivo =
		initialPartPosition + doubleLineBreak.index + doubleLineBreak[0].length;

	const endOfDataFile = dataString.indexOf(boundary, inicioDosDadosDoArquivo) - 2;

	if (endOfDataFile <= inicioDosDadosDoArquivo) return;

	const pureDataFile = completeBuffer.subarray(inicioDosDadosDoArquivo, endOfDataFile);

	req.file = Readable.from(pureDataFile);
};
