import PocketBase from 'pocketbase';

// Если разрабатываешь локально — адрес локального сервера
// Когда купишь VPS — поменяешь на свой домен
const url = 'http://127.0.0.1:8090';

export const pb = new PocketBase(url);

// Автоматически обновлять токен, если он протух
pb.autoCancellation(false);