import http from 'node:http';
import { jsonMiddleware } from './middlewares/json.middleware.js';
import routes from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const server = http.createServer(async (req, res) => {
	const { method, url } = req;

	await jsonMiddleware(req, res);
	const [pathname] = url!.split('?');

	const route = routes.find(route => {
		return route.method === method && route.path.test(pathname);
	});

	if (route) {
		const routeParams = req.url?.match(route.path);
		const { query, ...params } = routeParams?.groups as any;

		req.params = params;
		req.query = query ? extractQueryParams(query) : {};

		return route.handler(req, res);
	}

	return res.writeHead(404).end('Not Found');
});

server.listen(7070, () => {
	console.log('🚀 Server is running on http://localhost:7070');
});
