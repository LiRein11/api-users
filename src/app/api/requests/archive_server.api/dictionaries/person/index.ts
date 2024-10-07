import { $api } from '../../../../../../shared/api/api';
import { BasicResponse } from '../../../../entites/BasicResponse';
import IUser from '../../../../entites/User/IUser';
import { CreatePersonProps, FiredPersonProps, GetPersonProps, UpdatePersonProps } from './types';
import { Simulate } from 'react-dom/test-utils';

export const getPersonApi = (props: GetPersonProps) => {
    return $api
        .get<BasicResponse<IUser[]>>(`/person?active_only=${props.active_only ? 1 : 0}`)
        .then((response) => response.data);
};

export const createPersonApi = (props: CreatePersonProps) => {
    return $api.post(`/person`, props).then((response) => response.data);
};

export const updatePersonApi = (props: UpdatePersonProps) => {
    return $api.put(`/person`, props).then((response) => response.data);
};

export const updatePersonFiredApi = (props: FiredPersonProps) => {
    return $api.put(`/person`, props).then((response) => response.data);
};
