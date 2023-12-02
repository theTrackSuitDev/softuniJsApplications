import * as api from "./api.js";

export async function getAll() {
   return api.get('/data/characters?sortBy=_createdOn%20desc');
}

export async function getById(id) {
   return api.get('/data/characters/' + id);
}

export async function create(data) {
   return api.post('/data/characters', data);
}

export async function editById(id, data) {
   return api.put('/data/characters/' + id, data);
}

export async function getBySearch(searchInput) {
   return api.get(`/data/albums?where=name%20LIKE%20%22${searchInput}%22`);
}

export async function deleteById(id) {
   return api.del('/data/characters/' + id);
}

export async function getLikes(id) {
   return api.get(`/data/useful?where=characterId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function sendLike(data) {
   return api.post('/data/useful', data);
}

export async function getLikesByUser(user, item) {
   return api.get(`/data/useful?where=characterId%3D%22${item}%22%20and%20_ownerId%3D%22${user}%22&count`);
}