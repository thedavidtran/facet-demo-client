import http from "../http-common";

const getAll = () => {
	return http.get("/records");
};

const get = (id) => {
	return http.get(`/records/${id}`);
};

const create = (data) => {
	return http.post("/records", data);
};

const update = (id, data) => {
	return http.put(`/records/${id}`, data);
};

const remove = (id) => {
	return http.delete(`/records/${id}`);
};

const summary = (id) => {
	return http.get(`/records/summary/${id}`)
}

const Record = {
	getAll,
	get,
	create,
	update,
	remove,
	summary
};

export default Record;