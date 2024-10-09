import { create } from 'zustand';
import { GetPersonProps } from '../../../../../app/api/requests/archive_server.api/dictionaries/person/types';
import { getPersonApi } from '../../../../../app/api/requests/archive_server.api/dictionaries/person';
import IUser from '../../../../../app/api/entites/User/IUser';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UsersState {
    loading?: boolean;
    error?: string | null;
    users: IUser[];
    isOpenAdd: boolean;
}

interface UsersActions {
    getUsersAll: (props: GetPersonProps, isUpdated?: boolean) => void;
    setIsOpenAdd: (isOpenAdd: boolean) => void;
}

const initialState: UsersState = {
    loading: false,
    error: undefined,
    users: [],
    isOpenAdd: false,
};

export const useUsersSelectorStore = create<UsersState & UsersActions>()(
    persist(
        (set, getState) => ({
            ...initialState,
            setIsOpenAdd: (open) => {
                set({ isOpenAdd: open });
            },
            getUsersAll: (props, isUpdated = false) => {
                if (isUpdated || getState().users.length === 0) {
                    set({ loading: true, error: null });
                    getPersonApi(props)
                        .then((response) =>
                            set({
                                users: response.result ?? [],
                                error: response.error ?? '',
                            }),
                        )
                        .finally(() => set({ loading: false }));
                }
            },
        }),
        {
            name: 'users-storage',
            // storage: createJSONStorage(() => localStorage),
            version: 1,
        },
    ),
);

export default useUsersSelectorStore;
