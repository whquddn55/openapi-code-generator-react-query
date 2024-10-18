import createClient from "openapi-fetch";
import type { paths } from "./types";

const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
const baseUrl = "https://api.github.com";

const client = createClient<paths>({
	baseUrl,
	headers: {
		Authorization: `Bearer ${githubToken}`,
	},
});

export default client;
