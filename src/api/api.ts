import axios, { ResponseType } from "axios";
import { Paths, Params, FetchResponseData } from "../types/api";

const baseApiUrl = "https://api.github.com";

const getPathProcessedUrl = (
	url: string,
	paths?: { [key: string]: string | number }
): string => {
	if (!paths) return url;
	return url.replace(/\{([^{}]+)\}/g, (_, p1) => paths[p1]!.toString());
};

const getCookieProcessedHeader = (
	header: Record<string, string>,
	cookie?: string
): Record<string, string | undefined> => {
	return { ...header, Cookie: cookie };
};

const api = {
	get: async <P extends Paths<"get"> = Paths<"get">>(
		url: P,
		params: Params<"get", P>,
		responseType?: ResponseType
	) => {
		const processedUrl = getPathProcessedUrl(url, params.params?.path);

		const processedHeaders = getCookieProcessedHeader(
			params.params?.header ?? {},
			params.params?.cookie
		);

		return axios
			.get<FetchResponseData<P, "get">>(`${baseApiUrl}${processedUrl}`, {
				params: params.params?.query,
				headers: processedHeaders,
				responseType,
			})
			.then((v) => v.data);
	},
	post: async <P extends Paths<"post"> = Paths<"post">>(
		url: P,
		params: Params<"post", P>,
		responseType?: ResponseType
	) => {
		const processedUrl = getPathProcessedUrl(url, params.params?.path);

		const processedHeaders = getCookieProcessedHeader(
			params.params?.header ?? {},
			params.params?.cookie
		);

		return axios
			.post<FetchResponseData<P, "post">>(
				`${baseApiUrl}${processedUrl}`,
				params.body,
				{
					params: params.params?.query,
					headers: processedHeaders,
					responseType,
				}
			)
			.then((v) => v.data);
	},
	put: async <P extends Paths<"put"> = Paths<"put">>(
		url: P,
		params: Params<"put", P>,
		responseType?: ResponseType
	) => {
		const processedUrl = getPathProcessedUrl(url, params.params?.path);

		const processedHeaders = getCookieProcessedHeader(
			params.params?.header ?? {},
			params.params?.cookie
		);

		return axios
			.put<FetchResponseData<P, "put">>(
				`${baseApiUrl}${processedUrl}`,
				params.body,
				{
					params: params.params?.query,
					headers: processedHeaders,
					responseType,
				}
			)
			.then((v) => v.data);
	},
	delete: async <P extends Paths<"delete"> = Paths<"delete">>(
		url: P,
		params: Params<"delete", P>,
		responseType?: ResponseType
	) => {
		const processedUrl = getPathProcessedUrl(url, params.params?.path);

		const processedHeaders = getCookieProcessedHeader(
			params.params?.header ?? {},
			params.params?.cookie
		);

		return axios
			.delete<FetchResponseData<P, "delete">>(`${baseApiUrl}${processedUrl}`, {
				params: params.params?.query,
				headers: processedHeaders,
				responseType,
			})
			.then((v) => v.data);
	},
	patch: async <P extends Paths<"patch"> = Paths<"patch">>(
		url: P,
		params: Params<"patch", P>,
		responseType?: ResponseType
	) => {
		const processedUrl = getPathProcessedUrl(url, params.params?.path);

		const processedHeaders = getCookieProcessedHeader(
			params.params?.header ?? {},
			params.params?.cookie
		);

		return axios.patch<FetchResponseData<P, "patch">>(
			`${baseApiUrl}${processedUrl}`,
			params.body,
			{
				params: params.params?.query,
				headers: processedHeaders,
				responseType,
			}
		);
	},
};

export { api };
