import { useMutation, useQuery } from "@tanstack/react-query";
import client from "./client";
import { HttpMethod, PathsWithMethod } from "openapi-typescript-helpers";
import { paths } from "./types";
import { FetchOptions } from "openapi-fetch";

type Paths<M extends HttpMethod> = PathsWithMethod<paths, M>;
type Params<M extends HttpMethod, P extends Paths<M>> = M extends keyof paths[P]
	? FetchOptions<paths[P][M]>
	: never;

export const usePostMutation = <P extends Paths<"post">>(path: P) => {
	return useMutation({
		mutationFn: async (params: Params<"post", P>) => {
			const response = await client.POST(path, params);
			if (response.error) {
				throw response.error;
			}
			return response.data;
		},
	});
};

export const useGetQuery = <P extends Paths<"get">>(
	path: P,
	params: Params<"get", P>
) => {
	return useQuery({
		queryKey: [path, params],
		queryFn: async () => {
			const response = await client.GET(path, params);
			if (response.error) {
				throw response.error;
			}
			return response.data;
		},
	});
};

export const usePutMutation = <P extends Paths<"put">>(path: P) => {
	return useMutation({
		mutationFn: async (params: Params<"put", P>) => {
			const response = await client.PUT(path, params);
			if (response.error) {
				throw response.error;
			}
			return response.data;
		},
	});
};

export const useDeleteMutation = <P extends Paths<"delete">>(path: P) => {
	return useMutation({
		mutationFn: async (params: Params<"delete", P>) => {
			const response = await client.DELETE(path, params);
			if (response.error) {
				throw response.error;
			}
			return response.data;
		},
	});
};
