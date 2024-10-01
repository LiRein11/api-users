import IJobTitle from './IJobTitle';

interface IUser {
    id: number;
    code: number;
    fio: string;
    is_fired: boolean;
    iin: number;
    job_title: IJobTitle;
}

export default IUser;
