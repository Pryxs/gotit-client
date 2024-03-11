import { ICategory } from "features/categories";
import { IUser } from "features/users";

export type ILesson = {
    _id: string;
    title: string,
    author: IUser,
    content: string,
    categories: ICategory[],
    status: 'public' | 'private',
}