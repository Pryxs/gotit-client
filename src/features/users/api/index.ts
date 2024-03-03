import { http } from 'lib/axios';

import type { IUser } from '../types';
import type { IResponse } from 'types';



export const getUsers = async (): Promise<IUser[]> => {
    const { data } = await http.get<IResponse<IUser[]>>('/users');

    if (data?.ok) {
        return data.data;
    }

    return [];
};