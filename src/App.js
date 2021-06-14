import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import RecordsList from "./components/RecordsList";

function App() {
	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<a href="/" className="navbar-brand">
						facet demo
					</a>
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to="/records" className="nav-link">Records</Link>
						</li>
					</div>
				</nav>
				<div className="container mt-3">
				</div>
				{}
				<Switch>
					<Route path="/records">
						<Records />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function Records() {
	return (
		<div>
			<RecordsList />>
		</div>
	);
}

export default App;
