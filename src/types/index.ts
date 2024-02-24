export type IResponse<TData> = {
    ok: true;
    data: TData
} | {
    ok: false;
    error: string;
}

export type TokenType = {
    email: string;
    role: string;
    id: string;
}