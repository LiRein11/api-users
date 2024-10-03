import IUser from '../../../app/api/entites/User/IUser';
import { create } from 'zustand';
import {
    createPersonApi,
    getPersonApi,
} from '../../../app/api/requests/archive_server.api/dictionaries/person';
import {
    CreatePersonProps,
    GetPersonProps,
} from '../../../app/api/requests/archive_server.api/dictionaries/person/types';
import { BasicResponse } from '../../../app/api/entites/BasicResponse';

interface UsersState {
    loading?: boolean;
    error?: string | null;
    users: IUser[];
    openAdd: boolean;
    success: boolean;
    isAdmin: boolean;
}

interface UsersActions {
    getUsersAll: (props: GetPersonProps) => void;
    createPerson: (props: CreatePersonProps) => void;
    setOpenAdd: () => void;
    setSuccess: (success: boolean) => void;
    setIsAdmin: (isAdmin: boolean) => void;
    clearError: () => void;
}

const initialState: UsersState = {
    loading: false,
    error: undefined,
    success: false,
    users: [],
    openAdd: false,
    isAdmin: false,
};

export const useUsersStore = create<UsersState & UsersActions>((set, getState) => ({
    ...initialState,
    setOpenAdd: () => set((state) => ({ openAdd: !state.openAdd, error: null, success: false })),
    clearError: () => set({ error: null }),
    setSuccess: (success) => set({ success }),
    setIsAdmin: (isAdmin) => set({ isAdmin }),
    getUsersAll: (props) => {
        set({ loading: true, error: null });
        getPersonApi(props)
            .then((response) =>
                set({
                    users: response.result ?? [],
                    error: response.error ?? '',
                }),
            )
            .finally(() => set({ loading: false }));
    },
    createPerson: (props) => {
        set({ loading: true, error: null });
        createPersonApi(props)
            .then((response) => {
                if (!response.error) {
                    getState().setOpenAdd();
                    getState().getUsersAll({ active_only: true });
                    set({
                        success: true,
                    });
                } else {
                    set({
                        success: false,
                        error: response.error,
                    });
                }

                // Вызываем функцию для обновления списка пользователей
            })
            .catch((error) => set({ error: error.message }))
            .finally(() => set({ loading: false }));
    },
}));

export default useUsersStore;
