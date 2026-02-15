import { create } from 'zustand';
import { pb } from '../lib/pocketbase';

interface AuthState {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: pb.authStore.isValid,

    login: async (email: string, password: string) => {
        await pb.collection('users').authWithPassword(email, password);
        set({ isAuthenticated: true });
    },

    logout: () => {
        pb.authStore.clear();
        set({ isAuthenticated: false });
    },
}));

// Слушаем изменения authStore PocketBase и синхронизируем с Zustand
pb.authStore.onChange(() => {
    useAuthStore.setState({ isAuthenticated: pb.authStore.isValid });
});
