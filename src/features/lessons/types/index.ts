export type ILesson = {
    title: string,
    author: string,
    content: string,
    categories: string[],
    status: 'public' | 'private',
}