import {
	HttpMethod,
	IsOperationRequestBodyOptional,
	OperationRequestBodyContent,
	PathsWithMethod,
	RequiredKeysOf,
	MediaType,
	ResponseObjectMap,
	SuccessResponse,
	ErrorResponse,
} from "openapi-typescript-helpers";
import { paths } from "./types";

interface DefaultParamsOption {
	params?: {
		query?: Record<string, unknown>;
	};
}

type ParamsOption<T> = T extends {
	parameters: unknown;
}
	? RequiredKeysOf<T["parameters"]> extends never
		? { params?: T["parameters"] }
		: { params: T["parameters"] }
	: DefaultParamsOption;

type RequestBodyOption<T> = OperationRequestBodyContent<T> extends never
	? { body?: never }
	: IsOperationRequestBodyOptional<T> extends true
	? { body?: OperationRequestBodyContent<T> }
	: { body: OperationRequestBodyContent<T> };

type Paths<M extends HttpMethod> = PathsWithMethod<paths, M>;
type Params<M extends HttpMethod, P extends Paths<M>> = M extends keyof paths[P]
	? ParamsOption<paths[P][M]> & RequestBodyOption<paths[P][M]>
	: never;

type BodyType<T = unknown> = {
	json: T;
	text: Awaited<ReturnType<Response["text"]>>;
	blob: Awaited<ReturnType<Response["blob"]>>;
	arrayBuffer: Awaited<ReturnType<Response["arrayBuffer"]>>;
	stream: Response["body"];
};

type ParseAs = keyof BodyType;
type ParseAsResponse<T, Options> = Options extends {
	parseAs: ParseAs;
}
	? BodyType<T>[Options["parseAs"]]
	: T;

type FetchResponse<T, Options, Media extends MediaType> =
	| {
			data: ParseAsResponse<
				SuccessResponse<ResponseObjectMap<T>, Media>,
				Options
			>;
			error?: never;
			response: Response;
	  }
	| {
			data?: never;
			error: ErrorResponse<ResponseObjectMap<T>, Media>;
			response: Response;
	  };

type FetchResponseData<
	P extends Paths<M>,
	M extends HttpMethod
> = FetchResponse<paths[P][M], Params<M, P>, `${string}/${string}`>["data"];

export type { Params, Paths, FetchResponseData };
