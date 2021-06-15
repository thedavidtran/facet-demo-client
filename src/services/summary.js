import http from "../http-common";

const summary = () => {
	return http.get("/summary");
}

const Summary = {
	summary
};

export default Summary;