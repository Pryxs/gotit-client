export type IResponse<TData> = {
    ok: true;
    data: TData
} | {
    ok: false;
    error: string;
}

export type TokenType = {
    email: string;
    role: RoleType;
    id: string;
    exp: number;
    iat: number;
}

export type RoleType = 'admin' | 'editor' | 'user' | 'guest';
