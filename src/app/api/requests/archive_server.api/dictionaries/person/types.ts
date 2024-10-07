import IUser from '../../../../entites/User/IUser';

export interface GetPersonProps {
    active_only: boolean;
}

export interface CreatePersonProps {
    fio: string;
    code: string;
    job_title_id: number;
    iin: string;
}

export interface UpdatePersonProps extends CreatePersonProps {
    id: number;
    is_fired: boolean;
}

export interface FiredPersonProps extends IUser {}
