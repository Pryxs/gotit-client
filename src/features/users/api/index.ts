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

export const createUser = async (formData: IUser) => {
    const res = await http.post<IResponse<IUser[]>>('/users', formData);
    console.log(res)
    // if (data?.ok) {
    //     return data.data;
    // }

    // return [];
};


export const deleteUser = async (id: string) => {
    const res = await http.delete('/users/' + id);

    console.log(res)
};