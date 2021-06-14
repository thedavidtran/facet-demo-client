import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import RecordsList from "./components/RecordsList";

function App() {
	return (
		<div>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<a href="/" className="navbar-brand">
					facet demo
				</a>
			</nav>
			<RecordsList/>
		</div>
	);
}

export default App;