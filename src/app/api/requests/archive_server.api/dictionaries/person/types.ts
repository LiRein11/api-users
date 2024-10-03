export interface GetPersonProps {
    active_only: boolean;
}

export interface CreatePersonProps {
    fio: string;
    code: string;
    job_title_id: number;
    iin: string;
}
