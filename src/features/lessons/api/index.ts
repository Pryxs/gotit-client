import { http } from 'lib/axios';

import type { ILesson } from '../types';
import type { IResponse } from 'types';

type QueryParamsType = {
    q?: string;
    status?: string;
    author?: string;
    categories?: string;
}

export const getLessons = async (params?: QueryParamsType): Promise<ILesson[]> => {
    const { data } = await http.get<IResponse<ILesson[]>>('/lessons', { params });

    if (data?.ok) {
        return data.data;
    }

    return [];
};


export const getLesson = async (id: string): Promise<ILesson> => {
    const { data } = await http.get('/lessons/' + id);
    delete data.data._id;
    return data.data;
};

export const createLesson = async (formData: ILesson) => {
    const res = await http.post<IResponse<ILesson[]>>('/lessons', formData);
    console.log(res)
};

type UpdateProps = {
    id: string;
    formData: Partial<ILesson>
}

export const updateLesson = async ({ id, formData }: UpdateProps) => {
    const res = await http.patch('/lessons/' + id, formData);

    console.log(res)
};

export const deleteLesson = async (id: string) => {
    const res = await http.delete('/lessons/' + id);

    console.log(res)
};