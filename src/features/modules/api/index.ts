import { http } from 'lib/axios';

import type { IModule } from '../types';
import type { IResponse } from 'types';

type QueryParamsType = {
    q?: string;
    status?: string;
    author?: string;
    categories?: string;
}

export const getModules = async (params?: QueryParamsType): Promise<IModule[]> => {
    const { data } = await http.get<IResponse<IModule[]>>('/modules', { params });

    if (data?.ok) {
        return data.data;
    }

    return [];
};


export const getModule = async (id: string): Promise<IModule> => {
    const { data } = await http.get('/modules/' + id);
    delete data.data._id;
    return data.data;
};

type CreateModuleProps = Omit<IModule, 'author' | 'categories' | 'lessons'> & { categories: string[], lessons: string[] }

export const createModule = async (formData: CreateModuleProps) => {
    const res = await http.post<IResponse<IModule[]>>('/modules', formData);
    console.log(res)
};

type UpdateProps = {
    id: string;
    formData: Partial<IModule>
}

export const updateModule = async ({ id, formData }: UpdateProps) => {
    const res = await http.patch('/modules/' + id, formData);

    console.log(res)
};

export const deleteModule = async (id: string) => {
    const res = await http.delete('/modules/' + id);

    console.log(res)
};