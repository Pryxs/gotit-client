import { IUser } from "features/users";

export type ILesson = {
    title: string,
    author: IUser,
    content: string,
    categories: string[],
    status: 'public' | 'private',
}