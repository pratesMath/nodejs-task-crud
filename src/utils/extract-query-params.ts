export const extractQueryParams = (query: string) => {
	return query
		.slice(1)
		.split('&')
		.reduce((queryParams: Record<string, string>, param) => {
			const [key, value] = param.split('=');

			queryParams[key] = value;

			return queryParams;
		}, {});
};
