import PocketBase from 'pocketbase';

const url = import.meta.env.VITE_POCKETBASE_URL;

export const pb = new PocketBase(url);

// Автоматически обновлять токен, если он протух
pb.autoCancellation(false);