import { useMutation, useQuery } from "@tanstack/react-query";
import { Params, Paths } from "../types/api";
import { api } from "./api";

export const usePostMutation = <P extends Paths<"post">>(path: P) => {
	return useMutation({
		mutationFn: async (params: Params<"post", P>) => {
			return await api.post(path, params);
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
			return await api.get(path, params);
		},
	});
};

export const usePutMutation = <P extends Paths<"put">>(path: P) => {
	return useMutation({
		mutationFn: async (params: Params<"put", P>) => {
			return await api.put(path, params);
		},
	});
};

export const useDeleteMutation = <P extends Paths<"delete">>(path: P) => {
	return useMutation({
		mutationFn: async (params: Params<"delete", P>) => {
			return await api.delete(path, params);
		},
	});
};
