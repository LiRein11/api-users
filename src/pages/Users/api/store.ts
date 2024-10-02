import IUser from '../../../app/api/entites/User/IUser';
import { create } from 'zustand';
import { getPersonApi } from '../../../app/api/requests/archive_server.api/dictionaries/person';
import { GetPersonProps } from '../../../app/api/requests/archive_server.api/dictionaries/person/types';

interface UsersState {
    loading?: boolean;
    error?: string | null;
    users: IUser[];
}

interface UsersActions {
    getUsersAll: (props: GetPersonProps) => void;
}

const initialState: UsersState = {
    loading: false,
    error: undefined,
    users: [],
};

export const useUsersStore = create<UsersState & UsersActions>((set, getState) => ({
    ...initialState,
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
}));

export default useUsersStore;
