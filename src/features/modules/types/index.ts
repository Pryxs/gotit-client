import { IUser } from "features/users";

export type IModule = {
    title: string,
    author: IUser,
    level: number,
    lessons: string[],
    categories: string[],
    status: 'public' | 'private',
}