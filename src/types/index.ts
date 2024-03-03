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
}

export type RoleType = 'admin' | 'editor' | 'user' | 'guest';
