import { $api } from '../../../../../../shared/api/api';
import { BasicResponse } from '../../../../entites/BasicResponse';
import IUser from '../../../../entites/User/IUser';
import { GetPersonProps } from './types';

export const getPersonApi = (props: GetPersonProps) => {
    return $api
        .get<BasicResponse<IUser[]>>(`/person?active_only=${props.active_only ? 1 : 0}`)
        .then((response) => response.data);
};
