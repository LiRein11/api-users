import { FC } from 'react';

import { $api } from 'shared/api/api';
import { BasicResponse } from 'app/api/entites/BasicResponse';
import IUser from '../../app/api/entites/User/IUser';

interface UsersProps {}

const Users: FC<UsersProps> = (props) => {
    const {} = props;

    const test = $api.get<BasicResponse<IUser[]>>('/person?active_only=0');
    test.then((response) => console.log(response.data.result));

    return <div></div>;
};

export default Users;
