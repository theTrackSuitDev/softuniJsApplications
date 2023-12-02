import * as api from "./api.js";

export async function getAll() {
   return api.get('/data/catalog');
}

export async function getById(id) {
   return api.get('/data/catalog/' + id);
}

export async function create(data) {
   return api.post('/data/catalog', data);
}

export async function editById(id, data) {
   return api.put('/data/catalog/' + id, data);
}

export async function getByUserId(userId) {
   return api.get(`/data/catalog?where=_ownerId%3D%22${userId}%22`);
}

export async function deleteById(id) {
   return api.del('/data/catalog/' + id);
}