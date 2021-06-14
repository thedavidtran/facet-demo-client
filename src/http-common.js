import axios from "axios";

export default axios.create({
	baseURL: "https://facet-demo-server.herokuapp.com/api",
	headers: {
		"Content-type": "application/json"
	}
});