import "./App.css";
import { useGetQuery } from "./api/hooks";

function App() {
	const { data, isLoading } = useGetQuery("/gists", {});

	if (isLoading || !data) {
		return <div>Loading...</div>;
	}

	return (
		<div className="gist-list">
			<h2>Gist List</h2>
			<ul>
				{data.map((gist) => (
					<li key={gist.id}>
						<a
							href={gist.html_url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{gist.description || "No description"}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
