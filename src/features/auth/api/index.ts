import { http } from 'lib/axios';
import storage from 'utils/storage'

import type { UserResponse } from '../types';
import type { IResponse } from 'types';

export type LoginCredentials = {
    email: string;
    password: string;
};

export const login = async (params: LoginCredentials): Promise<boolean> => {
    const { data } = await http.post<IResponse<UserResponse>>('/auth/login', params);
    if (data?.ok) {
        storage.setToken(data.data.token)
        return true;
    }

    return false;
};