import IUser from '../../../app/api/entites/User/IUser';
import { create } from 'zustand';
import {
    createPersonApi,
    getPersonApi,
    updatePersonApi,
    updatePersonFiredApi,
} from '../../../app/api/requests/archive_server.api/dictionaries/person';
import {
    CreatePersonProps,
    FiredPersonProps,
    GetPersonProps,
    UpdatePersonProps,
} from '../../../app/api/requests/archive_server.api/dictionaries/person/types';

interface UsersState {
    loading?: boolean;
    error?: string | null;
    users: IUser[];
    openAdd: boolean;
    editable?: IUser;
}

interface UsersActions {
    getUsersAll: (props: GetPersonProps) => void;
    createPerson: (props: CreatePersonProps) => void;
    setOpenAdd: (open: boolean) => void;
    setEditable: (user?: IUser) => void;
    updatePerson: (props: UpdatePersonProps) => void;
    updatePersonFired: (props: FiredPersonProps) => void;
    clearError: () => void;
}

const initialState: UsersState = {
    loading: false,
    error: undefined,
    users: [],
    openAdd: false,
};

export const useUsersStore = create<UsersState & UsersActions>((set, getState) => ({
    ...initialState,
    setOpenAdd: (open) => {
        set({ openAdd: open });
    },
    clearError: () => set({ error: null }),
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
                    getState().setOpenAdd(false);
                    getState().getUsersAll({ active_only: true });
                } else {
                    set({
                        error: response.error,
                    });
                }
            })
            .finally(() => set({ loading: false }));
    },
    updatePerson: (props) => {
        set({ loading: true, error: null });
        updatePersonApi(props)
            .then((response) => {
                if (!response.error) {
                    // getState().setEditable(undefined);
                    getState().getUsersAll({ active_only: true });
                } else {
                    set({
                        error: response.error,
                    });
                }
            })
            .finally(() => set({ loading: false }));
    },
    updatePersonFired: (props) => {
        set({ loading: true, error: null });
        updatePersonFiredApi(props)
            .then((response) => {
                if (!response.error) {
                    getState().getUsersAll({ active_only: true });
                } else {
                    set({
                        error: response.error,
                    });
                }
            })
            .finally(() => set({ loading: false }));
    },
    setEditable: (user) => {
        set({ editable: user });
    },
}));

export default useUsersStore;
