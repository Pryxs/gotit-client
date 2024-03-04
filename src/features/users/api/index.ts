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


export const getUser = async (id: string): Promise<Omit<IUser, 'password'>> => {
    const { data } = await http.get('/users/' + id);
    delete data.data._id;
    return data.data;
};

export const createUser = async (formData: IUser) => {
    await http.post<IResponse<IUser[]>>('/users', formData);
};

type UpdateProps = {
    id: string;
    formData: Partial<Omit<IUser, 'password'>>
}

export const updateUser = async ({ id, formData }: UpdateProps) => {
    const res = await http.patch('/users/' + id, formData);

    console.log(res)
};

export const deleteUser = async (id: string) => {
    const res = await http.delete('/users/' + id);

    console.log(res)
};