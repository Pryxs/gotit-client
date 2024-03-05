import { ICategory } from "features/categories";
import { ILesson } from "features/lessons";
import { IUser } from "features/users";

export type IModule = {
    title: string,
    author: IUser,
    level: number,
    lessons: ILesson[],
    categories: ICategory[],
    status: 'public' | 'private',
}