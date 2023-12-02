import * as api from "./api.js";

export async function getAll() {
   return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function getById(id) {
   return api.get('/data/albums/' + id);
}

export async function create(data) {
   return api.post('/data/albums', data);
}

export async function editById(id, data) {
   return api.put('/data/albums/' + id, data);
}

export async function getBySearch(searchInput) {
   return api.get(`/data/albums?where=name%20LIKE%20%22${searchInput}%22`);
}

export async function deleteById(id) {
   return api.del('/data/albums/' + id);
}