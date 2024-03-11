import { http } from 'lib/axios';

import type { ICategory } from '../types';
import type { IResponse } from 'types';



export const getCategories = async (): Promise<(ICategory & { _id: string })[]> => {
    const { data } = await http.get<IResponse<(ICategory & { _id: string })[]>>('/categories');

    if (data?.ok) {
        return data.data;
    }

    return [];
};


export const getCategory = async (id: string): Promise<ICategory> => {
    const { data } = await http.get('/categories/' + id);
    delete data.data._id;
    return data.data;
};

export const createCategory = async (formData: ICategory) => {
    const res = await http.post<IResponse<ICategory[]>>('/categories', formData);
    console.log(res)
};

type UpdateProps = {
    id: string;
    formData: Partial<ICategory>
}

export const updateCategory = async ({ id, formData }: UpdateProps) => {
    const res = await http.patch('/categories/' + id, formData);

    console.log(res)
};

export const deleteCategory = async (id: string) => {
    const res = await http.delete('/categories/' + id);

    console.log(res)
};